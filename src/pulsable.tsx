import { ReactNode, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './css/index.scss';
import { iPlaceholder } from './image-placeholder';

interface bgColors {
  medium: string;
  light: string;
}

type pulseAnimation = 'none' | 'pulse' | 'wave' | 'wave-reverse';

export interface Props {
  animation?: pulseAnimation;
  children: ReactNode;
  isLoading: boolean;
  bgColors?: bgColors;
  noRadius?: boolean;
  noPadding?: boolean;
  className?: string;
  [key: string]: any;
}

const pulseClassNames: {
  [key: string]: string;
} = {
  pulse: 'pulse-animate',
  wave: 'pulse-animate-wave',
  'wave-reverse': 'pulse-animate-wave-reverse',
  none: 'pulse-animate-none',
};

function countLines(target: Element) {
  var style = window.getComputedStyle(target, null);
  var height = parseInt(style.getPropertyValue('height'), 10);
  var font_size = parseInt(style.getPropertyValue('font-size'), 10);
  var line_height = parseInt(style.getPropertyValue('line-height'), 10);
  var box_sizing = style.getPropertyValue('box-sizing');

  if (Number.isNaN(line_height)) line_height = font_size * 1.2;

  if (box_sizing === 'border-box') {
    var padding_top = parseInt(style.getPropertyValue('padding-top'), 10);
    var padding_bottom = parseInt(style.getPropertyValue('padding-bottom'), 10);
    var border_top = parseInt(style.getPropertyValue('border-top-width'), 10);
    var border_bottom = parseInt(
      style.getPropertyValue('border-bottom-width'),
      10
    );
    height = height - padding_top - padding_bottom - border_top - border_bottom;
  }

  var lines = Math.ceil(height / line_height);
  return { lines, font_size, height };
}

const Pulsable = ({
  animation = 'wave',
  children,
  isLoading,
  bgColors,
  noRadius = false,
  noPadding = false,
  className,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isCalculating, setCalculating] = useState(true);
  useEffect(() => {
    const manp = () => {
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
            pulseEl.style.setProperty(
              '--color-transparent-medium',
              bgColors?.medium || 'rgba(130, 130, 130, 0.3)'
            );

            pulseEl.style.setProperty(
              '--color-transparent-light',
              bgColors?.light || 'rgba(130, 130, 130, 0.2)'
            );

            if (element.classList.contains('pulsable-circle')) {
              pulseEl.classList.add(
                'pulse-child',
                pulseClassNames[animation],
                'pulse-child-circle'
              );
            } else if (element.classList.contains('pulsable-hidden')) {
              pulseEl.classList.add(
                'pulse-child',
                pulseClassNames[animation],
                'pulse-child-hidden'
              );
            } else if (element.classList.contains('pulsable-para')) {
              const res = countLines(element);
              pulseEl.classList.add('pulse-child', 'pulse-child-para-cont');
              const gap =
                (res.height - res.font_size * res.lines) / (res.lines + 2);

              const gapString = `${Math.max(gap, 8)}px`;

              // pulseEl.style.setProperty('gap', gapString);

              // pulseEl.style.setProperty('height', `${res.height - gap * 2}px`);
              pulseEl.style.setProperty('padding-top', gapString);
              pulseEl.style.setProperty('padding-bottom', gapString);

              const pulsePara = document.createElement('div');

              pulsePara.style.setProperty(
                'height',
                `${(res.font_size * 80) / 100}px`
              );
              pulsePara.style.setProperty(
                '--color-transparent-medium',
                bgColors?.medium || 'rgba(130, 130, 130, 0.3)'
              );

              pulsePara.style.setProperty(
                '--color-transparent-light',
                bgColors?.light || 'rgba(130, 130, 130, 0.2)'
              );

              pulsePara.classList.add(
                pulseClassNames[animation],
                'pulse-child-para'
              );

              for (let i = 0; i < res.lines; i++) {
                pulseEl.appendChild(pulsePara.cloneNode(true));
              }
            } else if (noRadius) {
              pulseEl.classList.add(
                'pulse-child',
                pulseClassNames[animation],
                'pulse-child-rect-sharp'
              );
            } else if (noPadding) {
              pulseEl.classList.add(
                'pulse-child',
                pulseClassNames[animation],
                'pulse-child-rect-full'
              );
            } else {
              pulseEl.classList.add(
                'pulse-child',
                pulseClassNames[animation],
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
    };

    requestAnimationFrame(manp);
  }, [isLoading, ref.current]);

  return (
    <div
      ref={ref}
      className={cn(
        'pulse-container',
        {
          'pulse-calculating pulse-container-css': isLoading && isCalculating,
          'pulse-container-css': isLoading,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Pulsable;
