import { createContext } from "react";

const initialState = {
  loggedIn: false,
  user: {},
  error: null,
  login: async () => {},
  signup: async () => {},
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
  signup: ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
};

export const AuthContext = createContext<authContextState>(initialState);
