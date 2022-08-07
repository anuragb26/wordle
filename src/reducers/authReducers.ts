import { authStateActions } from "../actions";
import { authContextState } from "../context/AuthContext";

type authStateActionTypes =
  | {
      type: authStateActions.LOGIN_SUCCESS;
      payload?: {};
    }
  | {
      type: authStateActions.LOGIN_FAILED;
      payload: authContextState["error"];
    }
  | {
      type: authStateActions.LOGOUT;
    }
  | {
      type: authStateActions.SIGNUP;
      payload: authContextState["user"] & { password: "string" };
    }
  | {
      type: authStateActions.SIGNUP_FAILED;
      payload: authContextState["error"];
    }
  | {
      type: authStateActions.SIGNUP_SUCCESS;
      payload?: {};
    }
  | {
      type: authStateActions.LOADING;
    };
type authReducerType = Pick<
  authContextState,
  "loggedIn" | "user" | "error" | "loading"
>;

export const initialAuthState: authReducerType = {
  user: null,
  loggedIn: false,
  error: "",
  loading: false,
};

export const authReducer = (
  state: authReducerType,
  action: authStateActionTypes
): authReducerType => {
  switch (action.type) {
    case authStateActions.LOGIN_SUCCESS: {
      return { ...state, loggedIn: true, loading: false, error: null };
    }
    case authStateActions.SIGNUP_SUCCESS: {
      return { ...state, loggedIn: true, loading: false, error: null };
    }
    case authStateActions.LOGIN_FAILED: {
      return { ...state, error: action.payload, loading: false };
    }
    case authStateActions.SIGNUP_FAILED: {
      return { ...state, error: action.payload, loading: false };
    }
    case authStateActions.LOADING: {
      return { ...state, loading: true };
    }
    default: {
      return { ...state };
    }
  }
};
