import axios from "axios";
import React, { useReducer, ReactNode, ReactElement } from "react";
import { AuthContext } from "../context/AuthContext";
import { authReducer, initialAuthState } from "../reducers/authReducers";
import { authStateActions } from "../actions";

type AuthProviderProps = { children: ReactNode };

type ErrorResponseProps = { data: { errors: Array<string>; error: string } };

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
      await axios({
        method: "POST",
        data: { email, password },
        url: `${process.env.REACT_APP_API_URL}/auth`,
      });
      console.log("login sucess");
      dispatch({ type: authStateActions.LOGIN_SUCCESS });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err?.response) {
          const { data } = err.response as ErrorResponseProps;
          if (data?.errors) {
            console.log("error in login", data.errors[0]);
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
  const signup = async ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      await axios({
        method: "POST",
        data: { email, password, firstName, lastName },
        url: `${process.env.REACT_APP_API_URL}/users`,
      });
      console.log("signup sucess");
      dispatch({ type: authStateActions.SIGNUP_SUCCESS });
    } catch (err) {
      console.log("befor if in axios error", err);
      if (axios.isAxiosError(err)) {
        console.log("in axios error", err.response);
        if (err?.response) {
          const { data } = err.response as ErrorResponseProps;
          if (data?.errors) {
            console.log("error in signup", data.errors[0]);
            dispatch({
              type: authStateActions.SIGNUP_FAILED,
              payload: data.errors[0],
            });
          } else if (data?.error) {
            console.log("error in signup", data.error);
            dispatch({
              type: authStateActions.SIGNUP_FAILED,
              payload: data.error,
            });
          } else {
            dispatch({
              type: authStateActions.SIGNUP_FAILED,
              payload: "unknown error",
            });
          }
        }
      }
    }
  };
  return (
    <AuthContext.Provider value={{ ...state, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
