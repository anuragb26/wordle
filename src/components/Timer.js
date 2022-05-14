import { Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import useTimer from "../customHooks/useTimer";

const Timer = ({ timer }) => {
  const startTimerRef = useRef(null);
  const [isRunning, start, stop, seconds] = useTimer(timer * 60);
  useEffect(() => {
    if (!startTimerRef.current) {
      start();
      startTimerRef.current = true;
    }
  }, [start]);
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
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
