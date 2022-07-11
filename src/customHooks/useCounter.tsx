import { useContext } from "react";
import { counterContextState, CounterContext } from "../context/CounterContext";

const useCounter = (): counterContextState => {
  const counter = useContext<counterContextState>(CounterContext);
  if (!counter) {
    throw new Error("counter is not present");
  }
  return counter;
};

export default useCounter;
