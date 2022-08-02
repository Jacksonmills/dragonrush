import React, { JSXElementConstructor, ReactComponentElement, ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ Component, container, ...props }: { Component: JSXElementConstructor<any>; container: HTMLElement; }) => {
  const [innerHtmlEmptied, setInnerHtmlEmptied] = useState(false);
  useEffect(() => {
    if (!innerHtmlEmptied) {
      container.innerHTML = '';
      setInnerHtmlEmptied(true);
    }
  }, [innerHtmlEmptied, container]);
  if (!innerHtmlEmptied) return null;
  return createPortal(<Component {...props} />, container);
};

export default Portal;