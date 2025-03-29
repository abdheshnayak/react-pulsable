import { ReactNode, useLayoutEffect, useRef } from 'react';
import setPulsing, { type Props } from 'pulsable';
import 'pulsable/index.css';

export interface IPulsable extends Props {
  children: ReactNode;
  isLoading: boolean;
  className?: string;
  config?: Props;
  [key: string]: any;
}

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

  useLayoutEffect(() => {
    if (!ref.current) return;
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
  }, [isLoading, ref.current]);

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
