import { Typography } from "@mui/material";
import { useEffect, useRef, ReactElement } from "react";
import useTimer from "../customHooks/useTimer";
import usePrevious from "../customHooks/usePrevious";

type TimerProps = {
  timer: number;
  onTimerEnd: () => void;
};
const Timer = ({ timer, onTimerEnd }: TimerProps): ReactElement => {
  const startTimerRef = useRef<null | Boolean>(null);
  const [isRunning, seconds, start] = useTimer(timer * 60);
  const previousIsRunning = usePrevious(isRunning);
  useEffect(() => {
    if (isRunning === false && previousIsRunning === true) {
      onTimerEnd();
    }
  }, [isRunning, onTimerEnd, previousIsRunning]);
  useEffect(() => {
    if (!startTimerRef.current) {
      start();
      startTimerRef.current = true;
    }
  }, [start]);
  let minutes: string | number = Math.floor(seconds / 60);
  let remainingSeconds: string | number = seconds % 60;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (remainingSeconds < 10) {
    remainingSeconds = `0${remainingSeconds}`;
  }
  return (
    <Typography variant="h6" component="h2">
      {`${minutes}:${remainingSeconds}`}
    </Typography>
  );
};

export default Timer;
