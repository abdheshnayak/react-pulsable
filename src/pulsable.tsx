import { ReactNode, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './css/index.scss';
import { iPlaceholder } from './image-placeholder';

export interface Props {
  children: ReactNode;
  isLoading: boolean;
  backgroundColor?: string;
  noRadius?: boolean;
}

const Pulsable = ({
  children,
  isLoading,
  backgroundColor,
  noRadius = false,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isCalculating, setCalculating] = useState(true);
  useEffect(() => {
    setCalculating(true);
    if (isLoading) {
      if (!ref.current) {
        return;
      }

      const iSvg = document.createElement('div');
      iSvg.classList.add('pulse-svg-cont');
      iSvg.innerHTML = iPlaceholder;

      ref.current.querySelectorAll('.pulsable').forEach((element) => {
        element.classList.add('pulse-element');

        if (!element.hasAttribute('disabled')) {
          element.classList.add('pulse-has-disabled-attr');
          element.setAttribute('disabled', 'true');
        }

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
          pulseEl.style.backgroundColor = backgroundColor || '#bebebe82';

          if (element.classList.contains('pulsable-circle')) {
            pulseEl.classList.add(
              'pulse-child',
              'pulse-animate',
              'pulse-child-circle'
            );
          } else if (element.classList.contains('pulsable-hidden')) {
            pulseEl.classList.add(
              'pulse-child',
              'pulse-animate',
              'pulse-child-hidden'
            );
          } else if (noRadius) {
            pulseEl.classList.add(
              'pulse-child',
              'pulse-animate',
              'pulse-child-rect-sharp'
            );
          } else {
            pulseEl.classList.add(
              'pulse-child',
              'pulse-animate',
              'pulse-child-rect'
            );
          }

          if (element.classList.contains('pulsable-img')) {
            pulseEl.appendChild(iSvg);
          }

          element.parentNode?.appendChild(pulseEl);
          element.appendChild(pulseEl);
        }
      });

      setCalculating(false);
    } else {
      if (!ref.current) {
        return;
      }

      ref.current.querySelectorAll('.pulse-child').forEach((v) => {
        v.parentNode?.removeChild(v);
      });

      ref.current.querySelectorAll('.pulse-element').forEach((v) => {
        if (v.classList) {
          v.classList.remove('pulse-element');
        }
      });

      ref.current
        .querySelectorAll('.pulse-has-disabled-attr')
        .forEach((element) => {
          element.removeAttribute('disabled');
          element.classList.remove('pulse-has-disabled-attr');
        });

      ref.current
        .querySelectorAll('.pulse-child-element')
        .forEach((element) => {
          element.classList.remove('pulse-child-element');
        });

      setCalculating(false);
    }
  }, [isLoading, ref.current]);

  return (
    <div
      ref={ref}
      className={cn('pulse-container', {
        'pulse-calculating pulse-container-css': isLoading && isCalculating,
        'pulse-container-css': isLoading,
      })}
    >
      {children}
    </div>
  );
};

export default Pulsable;
