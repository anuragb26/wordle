import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";

const KeyboardButton = styled(Button)(({ theme }) => ({
  height: "3rem",
  minWidth: "1.5rem",
  textAlign: "center",
  backgroundColor: "#d3d6da",
  marginRight: "0.5rem",
  marginBottom: "0.5rem",
  color: "black",
  fontWeight: "bolder",
}));

const renderKeyBoardRow = (letters, isLastRow) => {
  const keyboardButtons = [];
  if (isLastRow) {
    keyboardButtons.push(<KeyboardButton>Enter</KeyboardButton>);
  }
  for (const letter of letters) {
    keyboardButtons.push(<KeyboardButton>{letter}</KeyboardButton>);
  }
  if (isLastRow) {
    keyboardButtons.push(
      <KeyboardButton>
        <BackspaceIcon />
      </KeyboardButton>
    );
  }
  return keyboardButtons;
};

function Keyboard() {
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
          {renderKeyBoardRow(letters, index === 2)}
        </Box>
      ))}
    </Box>
  );
}

export default Keyboard;
