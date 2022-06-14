import { useState, useRef, useEffect, useCallback } from "react";

type TimerType = [Boolean, number, () => void, () => void];

const useTimer = (time: number): TimerType => {
  const [isRunning, setIsRunning] = useState<Boolean>(false);
  const [seconds, setSeconds] = useState<number>(time);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
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
  return [isRunning, seconds, start, stop];
};

export default useTimer;
