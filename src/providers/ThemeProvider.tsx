import React, { useState, ReactNode, ReactElement } from "react";
import { ThemeContext, themeState, ThemeType } from "../context/ThemeContext";
import { COLORS } from "../enums/colors";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({
  children,
}: ThemeProviderProps): ReactElement => {
  const [themeColor, setThemeColor] = useState<themeState>("light");
  const genericDark = { backgroundColor: COLORS.BLACK, color: COLORS.WHITE };
  const genericLight = { backgroundColor: COLORS.WHITE, color: COLORS.BLACK };
  const theme: ThemeType = {
    dark: {
      header: { ...genericDark },
      footer: { ...genericDark },
      typography: { color: COLORS.WHITE },
      box: { ...genericDark },
    },
    light: {
      header: { ...genericLight },
      footer: { ...genericLight },
      typography: { color: COLORS.BLACK },
      box: { ...genericLight },
    },
  };
  const toggleTheme = () => {
    const color = themeColor === "light" ? "dark" : "light";
    setThemeColor(color);
  };
  return (
    <ThemeContext.Provider value={{ theme: theme[themeColor], toggleTheme }}>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
};
