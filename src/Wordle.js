import React, { useEffect, useState, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useTheme from "./customHooks/useTheme";

import { COLORS } from "./enums";

const ALPHABETS = "ABCDEFGHIJKLMMNOPQRSTUVWXYZ";
const SECRET = "TRAIN";

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
const secretLetterMap = getSecretLetterMap(SECRET);

function Wordle() {
  const { theme } = useTheme();
  const [currentAttempt, setCurrentAttempt] = useState([]);
  const [previousAttempts, setPreviousAttempts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const previousAttemptsLength = previousAttempts.length;
  const handleKeyPress = useCallback(
    (event) => {
      if (gameOver) {
        return;
      }
      if (
        ALPHABETS.indexOf(event.key.toUpperCase()) > -1 &&
        currentAttempt.length < 5
      ) {
        setCurrentAttempt((currentAttempt) => [
          ...currentAttempt,
          event.key.toUpperCase(),
        ]);
      }
      if (event.key === "Enter" && currentAttempt.length === 5) {
        setCurrentAttempt([]);
        setPreviousAttempts((previousAttempts) => [
          ...previousAttempts,
          {
            attempt: currentAttempt.join(""),
            bgColor: getBgColor(currentAttempt, SECRET, secretLetterMap),
          },
        ]);
        setGameOver(currentAttempt.join("") === SECRET);
      }
      if (event.key === "Backspace" && currentAttempt.length) {
        setCurrentAttempt((currentAttempt) => currentAttempt.slice(0, -1));
      }
    },
    [currentAttempt, gameOver]
  );
  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);
    return () => window.removeEventListener("keyup", handleKeyPress);
  }, [handleKeyPress]);
  useEffect(() => {
    if (previousAttemptsLength === 6) {
      const message = gameOver ? "You Win" : "Better luck next time!";
      setTimeout(() => alert(message), 500);
    }
  }, [previousAttemptsLength]);
  return (
    <>
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
          <Header />
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
        </>
      </Box>
    </>
  );
}

export default Wordle;
