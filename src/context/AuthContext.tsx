import { createContext } from "react";

const initialState = {
  loggedIn: false,
  user: {},
  error: null,
  login: async () => {},
};

export type authContextState = {
  loggedIn: Boolean;
  user: { firstName?: string; lastName?: string; email?: string } | null;
  error: null | string;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
};

export const AuthContext = createContext<authContextState>(initialState);
