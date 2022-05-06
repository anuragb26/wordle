import React, { useEffect, useState, useRef, useMemo } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";

const ALPHABETS = "ABCDEFGHIJKLMMNOPQRSTUVWXYZ";
const SECRET = "TRAIN";

const getBgColor = (attempt, secret, secretLetterMap) => {
  const map = { ...secretLetterMap };
  const bgColors = [];
  attempt.split("").forEach((character, index) => {
    if (secret[index] === character) {
      map[character] -= 1;
      bgColors.push("green");
    } else if (secret.indexOf(character) !== -1 && map[character] !== 0) {
      map[character] -= 1;
      bgColors.push("yellow");
    } else {
      bgColors.push("gray");
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
  const [previousAttemptColors, setPreviousAttemptColors] = useState([]);
  useEffect(() => {
    const handleKeyPress = (event) => {
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
      if (event.key === "Enter") {
        if (currentAttempt.length === 5 && currentAttempt.join("") === SECRET) {
          alert("GAME OVER");
        }
        if (currentAttempt.length === 5 && currentAttempt.join("") !== SECRET) {
          setCurrentAttempt([]);
          setPreviousAttempts((previousAttempts) => [
            ...previousAttempts,
            currentAttempt.join(""),
          ]);
        }
      }
      if (event.key === "Backspace" && currentAttempt.length) {
        setCurrentAttempt((currentAttempt) => currentAttempt.slice(0, -1));
      }
    };
    window.addEventListener("keyup", handleKeyPress);
    return () => window.removeEventListener("keyup", handleKeyPress);
  }, [currentAttempt, previousAttempts.length]);
  const jsonPrevAttempts = JSON.stringify(previousAttempts);
  useEffect(() => {
    const colors = [];
    const attempts = JSON.parse(jsonPrevAttempts);
    attempts.forEach((previousAttempt) => {
      colors.push(getBgColor(previousAttempt, SECRET, secretLetterMap));
    });
    setPreviousAttemptColors(colors);
  }, [jsonPrevAttempts, setPreviousAttemptColors]);
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
          secret={SECRET}
          secretLetterMap={secretLetterMap}
          previousAttemptColors={previousAttemptColors}
        />
        <Keyboard
          previousAttempts={previousAttempts}
          previousAttemptColors={previousAttemptColors}
        />
      </Box>
    </Container>
  );
}

export default Wordle;
