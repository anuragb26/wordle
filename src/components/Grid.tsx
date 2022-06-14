import Box from "@mui/material/Box";
import { ReactElement } from "react";

const cellStyle = {
  width: "3.5rem",
  height: "3.5rem",
  border: "1px solid grey",
  marginBottom: "0.25rem",
  marginLeft: "0.25rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export type previousAttemptsProps = {
  attempt: string;
  bgColor: string[];
};
type GridProps = {
  previousAttempts: Array<previousAttemptsProps>;
  currentAttempt: Array<string>;
};

function Grid({ previousAttempts, currentAttempt }: GridProps): ReactElement {
  let remainingAttempts =
    6 - previousAttempts.length - (currentAttempt.length ? 1 : 0);
  const previousAttemptRows = previousAttempts.length
    ? previousAttempts.map(({ attempt, bgColor }, attemptIndex) => {
        return (
          <Box
            key={`${attempt}${attemptIndex}`}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              spacing: "1",
            }}
          >
            {attempt.split("").map((character, characterIndex) => (
              <Box
                key={`${attemptIndex}${characterIndex}`}
                sx={{
                  ...cellStyle,
                  backgroundColor: bgColor[characterIndex],
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            spacing: "1",
          }}
        >
          {currentAttempt.map((character, index) => (
            <Box
              key={index}
              sx={{
                ...cellStyle,
              }}
            >
              {character}
            </Box>
          ))}
          {Array(6 - currentAttempt.length)
            .fill("")
            .map((_, index) => (
              <Box
                key={index}
                sx={{
                  ...cellStyle,
                }}
              ></Box>
            ))}
        </Box>,
      ]
    : [];
  const remainingAttemptRows = Array(remainingAttempts)
    .fill("")
    .map((_, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          spacing: "1",
        }}
      >
        {Array(6)
          .fill("")
          .map((_, cellIndex) => (
            <Box
              key={cellIndex}
              sx={{
                ...cellStyle,
              }}
            ></Box>
          ))}
      </Box>
    ));
  const attemptRows: ReactElement[] = [
    ...previousAttemptRows,
    ...currentAttemptRow,
    ...remainingAttemptRows,
  ];
  return <>{attemptRows}</>;
}

export default Grid;
