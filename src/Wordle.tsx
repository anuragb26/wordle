import React, {
  useEffect,
  useCallback,
  useRef,
  useReducer,
  SyntheticEvent,
} from "react";
import Box from "@mui/material/Box";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import { Button } from "@mui/material";
import Difficulty from "./components/Difficulty";
import useModal from "./customHooks/useModal";
import useRandomWord from "./customHooks/useRandomWord";
import useCounter from "./customHooks/useCounter";
import { gameStateReducer, initialGameState } from "./reducers";
import { gameStateActions } from "./actions";
import { COLORS, MESSAGES } from "./enums";

const ALPHABETS = "ABCDEFGHIJKLMMNOPQRSTUVWXYZ";

interface SecretLetterMap {
  [key: string]: number;
}

const getBgColor = (
  attempt: string[],
  secret: string,
  secretLetterMap: SecretLetterMap
): string[] => {
  const map = { ...secretLetterMap };
  const bgColors: string[] = [];
  attempt.forEach((character, index) => {
    if (secret[index] === character && map[character] !== 0) {
      map[character] -= 1;
      bgColors.push(COLORS.GREEN);
    } else if (secret.indexOf(character) !== -1 && map[character] !== 0) {
      map[character] -= 1;
      bgColors.push(COLORS.YELLOW);
    } else {
      bgColors.push(COLORS.GRAY);
    }
  });
  return bgColors;
};
const getSecretLetterMap = (secret: string): SecretLetterMap => {
  return secret.split("").reduce((map: SecretLetterMap, char) => {
    if (char in map) {
      map[char]++;
    } else {
      map[char] = 1;
    }
    return map;
  }, {});
};

function Wordle() {
  const { setTimer, timeup, setTimeup } = useCounter();
  const [
    { currentAttempt, previousAttempts, gameOverMessage } = initialGameState,
    dispatch,
  ] = useReducer(gameStateReducer, initialGameState);
  const [SECRET, setSecret] = useRandomWord();
  const [wizardOpen, toggleWizard] = useModal();
  const [gameOverModal, toggleGameOverModal] = useModal();
  const pageLoadModalRef = useRef<boolean>(false);
  const previousAttemptsLength = previousAttempts.length;
  const chooseDifficulty = React.useCallback(
    (event: SyntheticEvent) => {
      setTimer(parseInt((event.target as HTMLInputElement).value));
      toggleWizard();
    },
    [toggleWizard, setTimer]
  );
  const showGameEnd = useCallback(() => {
    toggleGameOverModal();
    setTimer(0);
    setTimeup(false);
  }, [toggleGameOverModal, setTimer, setTimeup]);
  const handleKeyPress = useCallback(
    (event: Partial<KeyboardEvent>) => {
      if ([MESSAGES.WIN, MESSAGES.TIME_UP].includes(gameOverMessage)) {
        return;
      }
      const secretLetterMap = SECRET ? getSecretLetterMap(SECRET) : {};
      if (
        event.key &&
        ALPHABETS.indexOf(event.key.toUpperCase()) > -1 &&
        currentAttempt.length < 6
      ) {
        dispatch({
          type: gameStateActions.APPEND_CURRENT_ATTEMPT,
          payload: event.key.toUpperCase(),
        });
      }
      if (event.key === "Enter" && currentAttempt.length === 6) {
        dispatch({ type: gameStateActions.SET_CURRENT_ATTEMPT, payload: [] });
        dispatch({
          type: gameStateActions.APPEND_PREVIOUS_ATTEMPT,
          payload: {
            attempt: currentAttempt.join(""),
            bgColor: getBgColor(currentAttempt, SECRET, secretLetterMap),
          },
        });
        if (currentAttempt.join("").toUpperCase() === SECRET.toUpperCase()) {
          dispatch({
            type: gameStateActions.SET_GAME_OVER_MESSAGE,
            payload: MESSAGES.WIN,
          });
          setTimeout(() => showGameEnd(), 500);
        }
      }
      if (event.key === "Backspace" && currentAttempt.length) {
        dispatch({ type: gameStateActions.BACKSPACE_CURRENT_ATTEMPT });
      }
    },
    [currentAttempt, gameOverMessage, showGameEnd, SECRET]
  );
  const playAgain = () => {
    toggleGameOverModal();
    dispatch({ type: gameStateActions.RESET_GAME_STATE });
    setSecret();
    setTimer(0);
    pageLoadModalRef.current = false;
  };
  useEffect(() => {
    if (!pageLoadModalRef.current) {
      pageLoadModalRef.current = true;
      setTimeout(() => toggleWizard(), 1000);
    }
  });
  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);
    return () => window.removeEventListener("keyup", handleKeyPress);
  }, [handleKeyPress]);
  useEffect(() => {
    if (previousAttemptsLength === 6 && !gameOverMessage) {
      dispatch({
        type: gameStateActions.SET_GAME_OVER_MESSAGE,
        payload: MESSAGES.LOST,
      });
      setTimeout(() => showGameEnd(), 500);
    }
  }, [previousAttemptsLength, gameOverMessage, showGameEnd]);
  useEffect(() => {
    if (timeup && !gameOverMessage) {
      dispatch({
        type: gameStateActions.SET_GAME_OVER_MESSAGE,
        payload: MESSAGES.TIME_UP,
      });
      setTimeout(() => showGameEnd(), 500);
    }
  }, [timeup, gameOverMessage, showGameEnd]);
  return (
    <>
      {SECRET && (
        <>
          <Grid
            previousAttempts={previousAttempts}
            currentAttempt={currentAttempt}
          />
          <Keyboard
            previousAttempts={previousAttempts}
            onClick={handleKeyPress}
          />
          <Modal open={wizardOpen} heading={MESSAGES.CHOOSE_DIFFICULTY}>
            <Difficulty onSelect={chooseDifficulty} />
          </Modal>
          <Modal open={gameOverModal} heading={gameOverMessage}>
            {gameOverMessage && (
              <div>
                {[MESSAGES.TIME_UP, MESSAGES.LOST].includes(
                  gameOverMessage
                ) && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Secret Word:
                    <b>
                      <i>{SECRET}</i>
                    </b>
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button onClick={playAgain}>
                    <strong>PLAY AGAIN!</strong>
                  </Button>
                </Box>
              </div>
            )}
          </Modal>
        </>
      )}
    </>
  );
}

export default Wordle;
