import Box from "@mui/material/Box";
import { useMemo } from "react";

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

function Grid({ previousAttempts, currentAttempt, secret }) {
  const secretLetterMap = useMemo(() => getSecretLetterMap(secret), [secret]);

  let remainingAttempts =
    6 - previousAttempts.length - (currentAttempt.length ? 1 : 0);
  const previousAttemptRows = previousAttempts.length
    ? previousAttempts.map((attempt, attemptIndex) => {
        const bgColors = getBgColor(attempt, secret, secretLetterMap);
        console.log("bgColors", bgColors);
        return (
          <Box
            key={`${attempt}${attemptIndex}`}
            direction={"row"}
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {attempt.split("").map((character, characterIndex) => (
              <Box
                key={`${attemptIndex}${characterIndex}`}
                sx={{
                  width: "4rem",
                  height: "4rem",
                  border: "1px solid grey",
                  marginBottom: "0.5rem",
                  marginLeft: "0.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: bgColors[characterIndex],
                }}
              >
                {character}
              </Box>
            ))}
          </Box>
        );
      })
    : [];
  const currentAttemptRow = currentAttempt.length
    ? [
        <Box
          direction={"row"}
          spacing={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentAttempt.map((character, index) => (
            <Box
              key={index}
              sx={{
                width: "4rem",
                height: "4rem",
                border: "1px solid grey",
                marginBottom: "0.5rem",
                marginLeft: "0.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {character}
            </Box>
          ))}
          {Array(5 - currentAttempt.length)
            .fill()
            .map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: "4rem",
                  height: "4rem",
                  border: "1px solid grey",
                  marginBottom: "0.5rem",
                  marginLeft: "0.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>
            ))}
        </Box>,
      ]
    : [];
  const remainingAttemptRows = Array(remainingAttempts)
    .fill()
    .map((_, index) => (
      <Box
        key={index}
        direction={"row"}
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Array(5)
          .fill()
          .map((_, cellIndex) => (
            <Box
              key={cellIndex}
              sx={{
                width: "4rem",
                height: "4rem",
                border: "1px solid grey",
                marginBottom: "0.5rem",
                marginLeft: "0.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Box>
          ))}
      </Box>
    ));
  const attemptRows = [
    ...previousAttemptRows,
    ...currentAttemptRow,
    ...remainingAttemptRows,
  ];
  return attemptRows;
}

export default Grid;
