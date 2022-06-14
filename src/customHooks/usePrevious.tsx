import { useEffect, useRef } from "react";

const usePrevious = (val: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = val;
  }, [val]);
  return ref.current;
};

export default usePrevious;
