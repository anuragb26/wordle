import React, { ReactElement, ReactNode } from "react";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import Header from "./Header";
import useCounter from "../../customHooks/useCounter";
import useTheme from "../../customHooks/useTheme";

type LayoutProps = {
  children: ReactNode;
};

function Layout(props: LayoutProps): ReactElement {
  const { timer, setTimeup } = useCounter();
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        marginTop: "0.5rem",
        overflowX: "hidden",
        width: "100%",
        maxWidth: "100%",
        ...theme.box,
      }}
    >
      <Header
        timer={timer}
        onTimerEnd={() => {
          setTimeup(true);
        }}
      />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "5rem",
        }}
      >
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
