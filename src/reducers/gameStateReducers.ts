import { gameStateActions } from "../actions";
import { MESSAGES } from "../enums";
import { previousAttemptsProps } from "../components/Grid";

interface IGameStateReducer {
  currentAttempt: Array<string>;
  previousAttempts: Array<previousAttemptsProps>;
  gameOverMessage: MESSAGES;
}

type gameStateActionTypes =
  | {
      type: gameStateActions.APPEND_CURRENT_ATTEMPT;
      payload: string;
    }
  | {
      type: gameStateActions.APPEND_PREVIOUS_ATTEMPT;
      payload: previousAttemptsProps;
    }
  | {
      type: gameStateActions.SET_CURRENT_ATTEMPT;
      payload: Array<string>;
    }
  | {
      type: gameStateActions.SET_PREVIOUS_ATTEMPT;
      payload: previousAttemptsProps;
    }
  | {
      type: gameStateActions.SET_GAME_OVER_MESSAGE;
      payload: MESSAGES;
    }
  | {
      type: gameStateActions.BACKSPACE_CURRENT_ATTEMPT;
    }
  | {
      type: gameStateActions.RESET_GAME_STATE;
    };

export const initialGameState: IGameStateReducer = {
  currentAttempt: [],
  previousAttempts: [],
  gameOverMessage: MESSAGES.EMPTY_STRING,
};

export const gameStateReducer = (
  state: IGameStateReducer,
  action: gameStateActionTypes
): IGameStateReducer => {
  switch (action.type) {
    case gameStateActions.APPEND_CURRENT_ATTEMPT: {
      return {
        ...state,
        currentAttempt: [...state.currentAttempt, action.payload],
      };
    }
    case gameStateActions.APPEND_PREVIOUS_ATTEMPT: {
      return {
        ...state,
        previousAttempts: [...state.previousAttempts, action.payload],
      };
    }
    case gameStateActions.SET_CURRENT_ATTEMPT: {
      return { ...state, currentAttempt: action.payload };
    }
    case gameStateActions.SET_PREVIOUS_ATTEMPT: {
      return {
        ...state,
        previousAttempts: [...state.previousAttempts, action.payload],
      };
    }
    case gameStateActions.SET_GAME_OVER_MESSAGE: {
      return { ...state, gameOverMessage: action.payload };
    }
    case gameStateActions.BACKSPACE_CURRENT_ATTEMPT: {
      return { ...state, currentAttempt: state.currentAttempt.slice(0, -1) };
    }
    case gameStateActions.RESET_GAME_STATE: {
      return { ...initialGameState };
    }
    default: {
      return { ...initialGameState, ...state };
    }
  }
};
