import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("Theme is not present");
  }
  return theme;
};

export default useTheme;
