import Box from "@mui/material/Box";

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

function Grid({ previousAttempts, currentAttempt }) {
  let remainingAttempts =
    6 - previousAttempts.length - (currentAttempt.length ? 1 : 0);
  const previousAttemptRows = previousAttempts.length
    ? previousAttempts.map(({ attempt, bgColor }, attemptIndex) => {
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
                ...cellStyle,
              }}
            >
              {character}
            </Box>
          ))}
          {Array(6 - currentAttempt.length)
            .fill()
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
        {Array(6)
          .fill()
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
  const attemptRows = [
    ...previousAttemptRows,
    ...currentAttemptRow,
    ...remainingAttemptRows,
  ];
  return attemptRows;
}

export default Grid;
