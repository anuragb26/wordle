import React, { useState, ReactNode, ReactElement, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeState } from "../context/ThemeContext";

import { DefaultThemeContext } from "../context/DefaultThemeContext";

type DefaultThemeProviderProps = { children: ReactNode };

export const DefaultThemeProvider = ({
  children,
}: DefaultThemeProviderProps): ReactElement => {
  const [mode, setMode] = useState<themeState>("light");
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  return (
    <DefaultThemeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DefaultThemeContext.Provider>
  );
};
