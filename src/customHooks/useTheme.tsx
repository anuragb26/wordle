import { useContext } from "react";
import { ThemeContext, themeContextState } from "../context/ThemeContext";

const useTheme = (): themeContextState => {
  const theme = useContext<themeContextState>(ThemeContext);
  if (!theme) {
    throw new Error("Theme is not present");
  }
  return theme;
};

export default useTheme;
