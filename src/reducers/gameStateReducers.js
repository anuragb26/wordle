import {
  SET_CURRENT_ATTEMPT,
  SET_PREVIOUS_ATTEMPT,
  SET_GAME_OVER_MESSAGE,
  APPEND_CURRENT_ATTEMPT,
  APPEND_PREVIOUS_ATTEMPT,
  BACKSPACE_CURRENT_ATTEMPT,
  RESET_GAME_STATE,
} from "../actions";

export const initialGameState = {
  currentAttempt: [],
  previousAttempts: [],
  gameOverMessage: "",
};

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    case APPEND_CURRENT_ATTEMPT: {
      return {
        ...state,
        currentAttempt: [...state.currentAttempt, action.payload],
      };
    }
    case APPEND_PREVIOUS_ATTEMPT: {
      return {
        ...state,
        previousAttempts: [...state.previousAttempts, action.payload],
      };
    }
    case SET_CURRENT_ATTEMPT: {
      return { ...state, currentAttempt: action.payload };
    }
    case SET_PREVIOUS_ATTEMPT: {
      return {
        ...state,
        previousAttempts: [...state.previousAttempts, action.payload],
      };
    }
    case SET_GAME_OVER_MESSAGE: {
      return { ...state, gameOverMessage: action.payload };
    }
    case BACKSPACE_CURRENT_ATTEMPT: {
      return { ...state, currentAttempt: state.currentAttempt.slice(0, -1) };
    }
    case RESET_GAME_STATE: {
      return { ...initialGameState };
    }
    default: {
      return { ...initialGameState, ...state };
    }
  }
};
