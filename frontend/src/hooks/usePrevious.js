// File: usePrevious.js
// Description: hook that returns the previous value of a state

import {useRef, useEffect} from "react";

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}