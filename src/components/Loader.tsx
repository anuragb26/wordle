import React, { ReactElement } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate({
  style,
}: {
  style: { [key: string]: string };
}): ReactElement {
  return (
    <Box sx={{ display: "flex", ...style }}>
      <CircularProgress size="1.5rem" />
    </Box>
  );
}
