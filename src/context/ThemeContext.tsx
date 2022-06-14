import { createContext } from "react";

const initialState = {
  theme: {},
  toggleTheme: () => {},
};

export type themeState = "light" | "dark";
export type themeSectionTypes = "header" | "footer" | "typography" | "box";
export type ThemeType = {
  [key in themeState]: { [key in themeSectionTypes]?: {} };
};
export type themeContextState = {
  theme: ThemeType[themeState];
  toggleTheme: () => void;
};
export const ThemeContext = createContext<themeContextState>(initialState);
