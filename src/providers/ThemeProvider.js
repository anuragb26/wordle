import React, { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState("light");
  const theme = {
    dark: { type: "dark" },
    light: { type: "light" },
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
