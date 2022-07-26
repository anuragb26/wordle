import { useContext } from "react";
import { authContextState, AuthContext } from "../context/AuthContext";

const useAuth = (): authContextState => {
  const auth = useContext<authContextState>(AuthContext);
  if (!auth) {
    throw new Error("Auth is not present");
  }
  return auth;
};

export default useAuth;
