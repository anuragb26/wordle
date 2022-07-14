import { createContext } from "react";

const initialState = {
  toggleColorMode: () => {},
};

export type DefaultThemeContextState = {
  toggleColorMode: () => void;
};

export const DefaultThemeContext =
  createContext<DefaultThemeContextState>(initialState);
