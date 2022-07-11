import React, { ReactElement, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import useCounter from "../../customHooks/useCounter";

type LayoutProps = {
  children: ReactNode;
};

function Layout(props: LayoutProps): ReactElement {
  const { timer, setTimeup } = useCounter();
  return (
    <>
      <Header
        timer={timer}
        onTimerEnd={() => {
          setTimeup(true);
        }}
      />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
