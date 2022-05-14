import { useState, useRef, useEffect, useCallback } from "react";

const useTimer = (time) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(time);
  const intervalRef = useRef();
  const start = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    setIsRunning(true);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
  }, [setIsRunning]);
  useEffect(() => {
    if (seconds === 0) {
      stop();
    }
  }, [seconds, stop]);
  return [isRunning, start, stop, seconds];
};

export default useTimer;
