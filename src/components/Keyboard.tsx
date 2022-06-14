import React, { useMemo, ReactElement } from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { previousAttemptsProps } from "./Grid";
import { COLORS } from "../enums";

type KeyboardProps = {
  previousAttempts: Array<previousAttemptsProps>;
  onClick: (event: Partial<KeyboardEvent>) => void;
};

interface styledButtonProps {
  backgroundColor: string;
}

const KeyboardButton = styled(Button, {
  shouldForwardProp: (props) => props !== "backgroundColor",
})<styledButtonProps>(({ theme, backgroundColor }) => ({
  height: "3rem",
  minWidth: "1.5rem",
  textAlign: "center",
  backgroundColor,
  marginRight: "0.5rem",
  marginBottom: "0.5rem",
  color: "inherit",
  fontWeight: "bolder",
  "&:hover": {
    backgroundColor,
  },
  "&:focus": {
    backgroundColor,
  },
}));

const renderKeyBoardRow = (
  letters: string,
  characterColorMap: { [key: string]: string },
  onClick: (e: Partial<KeyboardEvent>) => void,
  isLastRow: Boolean
) => {
  const keyboardButtons = [];
  if (isLastRow) {
    keyboardButtons.push(
      <KeyboardButton
        backgroundColor={COLORS.KEYBOARD_GRAY}
        onClick={() => onClick({ key: "Enter" })}
        disableRipple={true}
        disableFocusRipple={true}
      >
        Enter
      </KeyboardButton>
    );
  }
  for (const letter of letters) {
    const backgroundColor = characterColorMap[letter]
      ? characterColorMap[letter]
      : COLORS.KEYBOARD_GRAY;
    keyboardButtons.push(
      <KeyboardButton
        backgroundColor={backgroundColor}
        onClick={() => onClick({ key: letter })}
        disableRipple={true}
        disableFocusRipple={true}
      >
        {letter}
      </KeyboardButton>
    );
  }
  if (isLastRow) {
    keyboardButtons.push(
      <KeyboardButton
        backgroundColor={COLORS.KEYBOARD_GRAY}
        onClick={() => onClick({ key: "Backspace" })}
        disableRipple={true}
        disableFocusRipple={true}
      >
        <BackspaceIcon />
      </KeyboardButton>
    );
  }
  return keyboardButtons;
};

const COLOR_HIERARCHY = {
  [COLORS.KEYBOARD_GRAY]: 1,
  [COLORS.GRAY]: 2,
  [COLORS.YELLOW]: 3,
  [COLORS.GREEN]: 4,
};

type COLORTYPES = keyof typeof COLOR_HIERARCHY;
type CharacterMapObject = { [key: string]: COLORTYPES };

const getCharacterMap = (
  previousAttempts: KeyboardProps["previousAttempts"]
): CharacterMapObject =>
  previousAttempts.reduce((map: CharacterMapObject, { attempt, bgColor }) => {
    attempt.split("").forEach((character, index) => {
      const existingColor = map[character] || COLORS.KEYBOARD_GRAY;
      const currentColor = bgColor[index] as COLORTYPES;
      const existingColorNumber = COLOR_HIERARCHY[existingColor];
      const currentColorNumber = COLOR_HIERARCHY[currentColor];
      map[character] =
        currentColorNumber > existingColorNumber ? currentColor : existingColor;
    });
    return map;
  }, {});

function Keyboard({ previousAttempts, onClick }: KeyboardProps): ReactElement {
  const characterColorMap = useMemo(
    () => getCharacterMap(previousAttempts),
    [previousAttempts]
  );
  return (
    <Box sx={{ flex: "1", marginTop: "2rem" }}>
      {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((letters, index) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {renderKeyBoardRow(letters, characterColorMap, onClick, index === 2)}
        </Box>
      ))}
    </Box>
  );
}

export default Keyboard;
