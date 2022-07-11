import { createContext } from "react";

const initialState = {
  timer: 0,
  setTimer: () => {},
  timeup: false,
  setTimeup: () => {},
};

export type counterContextState = {
  timer: number;
  setTimer: (timer: number) => void;
  timeup: Boolean;
  setTimeup: (timeup: boolean) => void;
};

export const CounterContext = createContext<counterContextState>(initialState);
