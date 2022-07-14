import { useContext } from "react";
import {
  DefaultThemeContextState,
  DefaultThemeContext,
} from "../context/DefaultThemeContext";

const useDefaultTheme = (): DefaultThemeContextState => {
  const theme = useContext<DefaultThemeContextState>(DefaultThemeContext);
  if (!theme) {
    throw new Error("Theme is not present");
  }
  return theme;
};

export default useDefaultTheme;
