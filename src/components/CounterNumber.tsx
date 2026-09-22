import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface CounterNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
}

export const CounterNumber: React.FC<CounterNumberProps> = ({
  value,
  suffix = '+',
  prefix = '',
  duration = 1800,
  className = '',
  suffixClassName = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Quartic ease out: rapid start with a gentle, silky deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentVal = Math.round(easeProgress * value);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return (
    <span
      ref={ref}
      aria-label={`${prefix}${value}${suffix}`}
      className="inline-flex items-baseline select-none tabular-nums"
    >
      {prefix && <span>{prefix}</span>}
      <span className={className}>{count}</span>
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
};
