import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import { COLORS } from "./enums";

const ALPHABETS = "ABCDEFGHIJKLMMNOPQRSTUVWXYZ";
const SECRET = "TRAIN";

const getBgColor = (attempt, secret, secretLetterMap) => {
  const map = { ...secretLetterMap };
  const bgColors = [];
  attempt.forEach((character, index) => {
    if (secret[index] === character) {
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
  const [currentAttempt, setCurrentAttempt] = useState([]);
  const [previousAttempts, setPreviousAttempts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const previousAttemptsLength = previousAttempts.length;
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameOver) {
        return;
      }
      if (
        ALPHABETS.indexOf(String.fromCharCode(event.keyCode).toUpperCase()) >
          -1 &&
        currentAttempt.length < 5
      ) {
        setCurrentAttempt((currentAttempt) => [
          ...currentAttempt,
          String.fromCharCode(event.keyCode).toUpperCase(),
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
    };
    window.addEventListener("keyup", handleKeyPress);
    return () => window.removeEventListener("keyup", handleKeyPress);
  }, [currentAttempt, gameOver]);
  useEffect(() => {
    if (previousAttemptsLength === 6 && !gameOver) {
      setTimeout(() => alert("Better luck next time!"), 500);
      setGameOver(true);
    }
    if (previousAttemptsLength < 6 && gameOver) {
      setTimeout(() => alert("You Win"), 500);
    }
  }, [previousAttemptsLength, gameOver]);
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid
          previousAttempts={previousAttempts}
          currentAttempt={currentAttempt}
        />
        <Keyboard previousAttempts={previousAttempts} />
      </Box>
    </Container>
  );
}

export default Wordle;
