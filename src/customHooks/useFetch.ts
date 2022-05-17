import { useEffect, useReducer } from "react";

function useFetch(url, options) {
  const initialState = {
    data: {},
    loading: false,
    error: null,
  };
  const reducer = (action, state) => {
    switch (action.type) {
      case "FETCHING": {
        return { ...state, loading: true };
      }
      case "FETCHED": {
        return { ...state, loading: false, data: action.payload };
      }
      case "ERROR": {
        return { ...state, loading: false, error: action.payload };
      }
      default: {
        return state;
      }
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const invokeApi = async () => {
      try {
        dispatch({ type: "FETCHING" });
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("data", data);
        dispatch({ type: "FETCHED", payload: data });
      } catch (err) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    };
    invokeApi();
  }, [url]);
  return state;
}
export default useFetch;
