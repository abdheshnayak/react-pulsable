import { ReactNode, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './css/index.scss';

export interface Props {
  children: ReactNode;
  isLoading: boolean;
}

const Pulsable = ({ children, isLoading }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isCalculating, setCalculating] = useState(true);
  useEffect(() => {
    setCalculating(true);
    if (isLoading) {
      if (!ref.current) {
        return;
      }
      const docs = ref.current.querySelectorAll('.pulsable');
      docs.forEach((element) => {
        element.classList.add('pulse-element');
        element.childNodes.forEach((ch: any) => {
          if (ch.classList && !ch.classList.contains('pulse-child')) {
            ch.classList.add('pulse-child-element');

            if (!ch?.hasAttribute('disabled')) {
              ch.classList.add('pulse-has-disabled-attr');
              ch.setAttribute('disabled', 'true');
            }
          }
        });
        const pc = element.querySelector('.pulse-child');
        if (!pc) {
          const pulseEl = document.createElement('div');
          pulseEl.classList.add('pulse-child', 'animate-pulse');
          element.appendChild(pulseEl);
        }
      });

      setCalculating(false);
    } else {
      if (!ref.current) {
        return;
      }
      const pc = ref.current.querySelectorAll('.pulse-child');

      pc.forEach((v) => {
        v.parentNode?.removeChild(v);
      });

      const pc2 = ref.current.querySelectorAll('.pulse-element');
      pc2.forEach((v) => {
        if (v.classList) {
          v.classList.remove('pulse-element');
        }
      });

      const docs = ref.current.querySelectorAll('.pulse-child-element');
      console.log(docs, 'docs');
      docs.forEach((element) => {
        console.log(element.classList, 'here');
        element.classList.remove('pulse-child-element');

        if (element.classList.contains('pulse-has-disabled-attr')) {
          element.removeAttribute('disabled');
          element.classList.remove('pulse-has-disabled-attr');
        }
      });

      setCalculating(false);
    }
  }, [isLoading, ref.current]);

  return (
    <div
      ref={ref}
      className={cn('pulse-container transition-all', {
        'opacity-0 pulse-container-css': isLoading && isCalculating,
        'flex flex-col pulse-container-css': isLoading,
      })}
    >
      {children}
    </div>
  );
};

export default Pulsable;
