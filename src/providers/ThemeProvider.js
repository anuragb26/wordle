import React, { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { COLORS } from "../enums/colors";

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState("light");
  const genericDark = { backgroundColor: COLORS.BLACK, color: COLORS.WHITE };
  const genericLight = { backgroundColor: "white", color: "black" };
  const theme = {
    dark: {
      header: { ...genericDark },
      footer: { ...genericDark },
      typography: { color: "white" },
      container: { ...genericDark },
    },
    light: {
      header: { ...genericLight },
      footer: { ...genericLight },
      typography: { color: "black" },
      container: { ...genericLight },
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
