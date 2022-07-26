import axios, { AxiosError } from "axios";
import React, { useReducer, ReactNode, ReactElement } from "react";
import { AuthContext } from "../context/AuthContext";
import { authReducer, initialAuthState } from "../reducers/authReducers";
import { authStateActions } from "../actions";

type AuthProviderProps = { children: ReactNode };

type ErrorResponseProps = { data: { errors: Array<string> } };

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios({
        method: "POST",
        data: { email, password },
        url: `${process.env.REACT_APP_API_URL}/auth`,
      });
      dispatch({ type: authStateActions.LOGIN_SUCCESS });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err?.response) {
          const { data } = err.response as ErrorResponseProps;
          if (data?.errors) {
            console.log("error", data.errors[0]);
            dispatch({
              type: authStateActions.LOGIN_FAILED,
              payload: data.errors[0],
            });
          } else {
            dispatch({
              type: authStateActions.LOGIN_FAILED,
              payload: "unknown error",
            });
          }
        }
      }
    }
  };
  return (
    <AuthContext.Provider value={{ ...state, login }}>
      {children}
    </AuthContext.Provider>
  );
};
