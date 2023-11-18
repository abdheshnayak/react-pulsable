import { ReactNode, useEffect, useRef, useState } from 'react';
import setPulsing, { type Props } from 'pulsable';
import 'pulsable/index.css';

export interface IPulsable extends Props {
  children: ReactNode;
  isLoading: boolean;
  className?: string;
  config?: Props;
  [key: string]: any;
}

type IuseDebounce = (action: () => any, delay: number, dep: any[]) => void;

const useDebounce: IuseDebounce = (action, delay, dep = []) => {
  const timerRef = useRef<number | undefined>();
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      action();
    }, delay);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [delay, ...dep]);
};

const Pulsable = ({
  children,
  isLoading,
  className,
  config,
  ...props
}: IPulsable) => {
  const {
    animation = 'wave',
    bgColors,
    noRadius = false,
    noPadding = false,
  } = config || {};

  const ref = useRef<HTMLDivElement>(null);

  const [isFirstTime, setIsFirstTime] = useState(true);

  useDebounce(
    () => {
      if (!ref.current) return;
      setIsFirstTime(false);
      setPulsing({
        rootElement: ref.current,
        config: {
          animation,
          bgColors,
          noRadius,
          noPadding,
        },
        loading: isLoading,
      });
    },
    isFirstTime ? 0 : 50,
    [isLoading, ref.current]
  );

  return (
    <div
      ref={ref}
      className={`${className} pulsable-cont pulsable-base`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Pulsable;
