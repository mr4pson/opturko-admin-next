import React, { useEffect } from 'react';

export function useOnClickOutside(
  ref: React.MutableRefObject<HTMLElement | HTMLDivElement | null>,
  handler: (value: Event) => void,
  elemRef?: React.MutableRefObject<HTMLElement | HTMLDivElement | null>,
): void {
  useEffect(
    () => {
      const listener = (event: Event): void => {
        // Do nothing if clicking ref's element or descendent elements
        const target = event.target as HTMLElement;

        if (
          (ref.current && ref.current.contains(target)) ||
          elemRef?.current?.contains(target)
        ) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
      };
    },
    // Hook checks if ref.current contains event target,
    // and if it contains, then the handler executing.
    [ref, handler, elemRef],
  );
}
