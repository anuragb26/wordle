import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useReducer,
  SyntheticEvent,
} from "react";
import Box from "@mui/material/Box";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { Button } from "@mui/material";
import Difficulty from "./components/Difficulty";
import useTheme from "./customHooks/useTheme";
import useModal from "./customHooks/useModal";
import useRandomWord from "./customHooks/useRandomWord";
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
  const { theme } = useTheme();
  const [
    { currentAttempt, previousAttempts, gameOverMessage } = initialGameState,
    dispatch,
  ] = useReducer(gameStateReducer, initialGameState);
  const [SECRET, setSecret] = useRandomWord();
  const [difficultyModalState, toggleDifficultyModal] = useModal();
  const [gameOverModal, toggleGameOverModal] = useModal();
  const [timer, setTimer] = useState<number>(0);
  const pageLoadModalRef = useRef<boolean>(false);
  const previousAttemptsLength = previousAttempts.length;
  const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chooseDifficulty = React.useCallback(
    (event: SyntheticEvent) => {
      setTimer(parseInt((event.target as HTMLInputElement).value));
      toggleDifficultyModal();
    },
    [toggleDifficultyModal]
  );
  const showGameEnd = useCallback(
    (message: MESSAGES) => {
      toggleGameOverModal();
      dispatch({
        type: gameStateActions.SET_GAME_OVER_MESSAGE,
        payload: message,
      });
      timeOutRef.current = null;
    },
    [toggleGameOverModal, dispatch]
  );
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
          timeOutRef.current = setTimeout(() => showGameEnd(MESSAGES.WIN), 500);
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
    timeOutRef.current = null;
  };
  useEffect(() => {
    if (!pageLoadModalRef.current) {
      pageLoadModalRef.current = true;
      setTimeout(() => toggleDifficultyModal(), 1000);
    }
  });
  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);
    return () => window.removeEventListener("keyup", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (previousAttemptsLength === 6 && !timeOutRef.current) {
      setTimeout(() => showGameEnd(MESSAGES.LOST), 500);
    }
  }, [previousAttemptsLength, showGameEnd]);
  return (
    <>
      {SECRET && (
        <Box
          sx={{
            marginTop: "0.5rem",
            overflowX: "hidden",
            width: "100%",
            maxWidth: "100%",
            // disableGutters: true,
            ...theme.box,
          }}
        >
          <>
            <Header
              timer={timer}
              onTimerEnd={() => {
                timeOutRef.current = setTimeout(
                  () => showGameEnd(MESSAGES.TIME_UP),
                  500
                );
              }}
            />
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "5rem",
              }}
            >
              <Grid
                previousAttempts={previousAttempts}
                currentAttempt={currentAttempt}
              />
              <Keyboard
                previousAttempts={previousAttempts}
                onClick={handleKeyPress}
              />
            </Box>
            <Footer />
            <Modal
              open={difficultyModalState}
              heading={MESSAGES.CHOOSE_DIFFICULTY}
            >
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
        </Box>
      )}
    </>
  );
}

export default Wordle;
