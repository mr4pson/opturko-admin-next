import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

import { createWrapperAndAppendToBody } from './utils';

type Props = {
  children: JSX.Element;
  wrapperId: string;
};

const ReactPortal = ({
  children,
  wrapperId = 'react-portal-wrapper',
}: Props) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null,
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

export default ReactPortal;
