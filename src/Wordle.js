import React, { useEffect, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";

function Wordle() {
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
        <Grid />
        <Keyboard />
      </Box>
    </Container>
  );
}

export default Wordle;
