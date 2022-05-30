import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useReducer,
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
import {
  SET_CURRENT_ATTEMPT,
  SET_GAME_OVER_MESSAGE,
  APPEND_CURRENT_ATTEMPT,
  APPEND_PREVIOUS_ATTEMPT,
  BACKSPACE_CURRENT_ATTEMPT,
  RESET_GAME_STATE,
} from "./actions";

import { COLORS, MESSAGES } from "./enums";

const ALPHABETS = "ABCDEFGHIJKLMMNOPQRSTUVWXYZ";

const getBgColor = (attempt, secret, secretLetterMap) => {
  const map = { ...secretLetterMap };
  const bgColors = [];
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
const getSecretLetterMap = (secret) => {
  return secret.split("").reduce((map, char) => {
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
  const [timer, setTimer] = useState(0);
  const pageLoadModalRef = useRef(false);
  const previousAttemptsLength = previousAttempts.length;
  const timeOutRef = useRef(null);
  const chooseDifficulty = React.useCallback(
    (event) => {
      setTimer(event.target.value);
      toggleDifficultyModal();
    },
    [toggleDifficultyModal]
  );
  const showGameEnd = useCallback(
    (message) => {
      toggleGameOverModal();
      dispatch({ type: SET_GAME_OVER_MESSAGE, payload: message });
      timeOutRef.current = null;
    },
    [toggleGameOverModal, dispatch]
  );
  const handleKeyPress = useCallback(
    (event) => {
      if ([MESSAGES.WIN, MESSAGES.TIME_UP].includes(gameOverMessage)) {
        return;
      }
      const secretLetterMap = SECRET ? getSecretLetterMap(SECRET) : {};
      if (
        ALPHABETS.indexOf(event.key.toUpperCase()) > -1 &&
        currentAttempt.length < 6
      ) {
        dispatch({
          type: APPEND_CURRENT_ATTEMPT,
          payload: event.key.toUpperCase(),
        });
      }
      if (event.key === "Enter" && currentAttempt.length === 6) {
        dispatch({ type: SET_CURRENT_ATTEMPT, payload: [] });
        dispatch({
          type: APPEND_PREVIOUS_ATTEMPT,
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
        dispatch({ type: BACKSPACE_CURRENT_ATTEMPT });
      }
    },
    [currentAttempt, gameOverMessage, showGameEnd, SECRET]
  );
  const playAgain = () => {
    toggleGameOverModal();
    dispatch({ type: RESET_GAME_STATE });
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
            ...theme.box,
          }}
          disableGutters={true}
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
