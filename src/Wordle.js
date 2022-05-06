import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";

const ALPHABETS = "ABCDEFGHIJKLMMNOPQRSTUVWXYZ";
const SECRET = "TRAIN";

function Wordle() {
  const [currentAttempt, setCurrentAttempt] = useState([]);
  const [previousAttempts, setPreviousAttempts] = useState([]);

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
  }, [currentAttempt, previousAttempts]);
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
        />
        <Keyboard />
      </Box>
    </Container>
  );
}

export default Wordle;
