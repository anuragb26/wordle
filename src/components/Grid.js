import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles";

function Grid({ attempts }) {
  return (
    <Box
      sx={{
        flex: "1",
        width: "100%",
      }}
    >
      {Array(6)
        .fill()
        .map((_, rowIndex) => (
          <Box
            key={rowIndex}
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
                >
                  {attempts[rowIndex] && attempts[rowIndex][cellIndex]
                    ? attempts[rowIndex][cellIndex]
                    : ""}
                </Box>
              ))}
          </Box>
        ))}
    </Box>
  );
}

export default Grid;
