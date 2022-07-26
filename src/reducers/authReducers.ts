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
    };
type authReducerType = Pick<authContextState, "loggedIn" | "user" | "error">;

export const initialAuthState: authReducerType = {
  user: null,
  loggedIn: false,
  error: "",
};

export const authReducer = (
  state: authReducerType,
  action: authStateActionTypes
): authReducerType => {
  switch (action.type) {
    case authStateActions.LOGIN_SUCCESS: {
      return { ...state, loggedIn: true };
    }
    case authStateActions.LOGIN_FAILED: {
      return { ...state, error: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
