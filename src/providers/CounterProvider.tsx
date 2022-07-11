import React, { useState, ReactNode, ReactElement } from "react";
import { CounterContext } from "../context/CounterContext";

type CounterProviderPropTypes = {
  children: ReactNode;
};

export const CounterProvider = ({
  children,
}: CounterProviderPropTypes): ReactElement => {
  const [timer, setTimer] = useState<number>(0);
  const [timeup, setTimeup] = useState<Boolean>(false);
  return (
    <CounterContext.Provider value={{ timer, setTimer, timeup, setTimeup }}>
      <>{children}</>
    </CounterContext.Provider>
  );
};
