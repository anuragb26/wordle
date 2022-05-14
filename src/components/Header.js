import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import PsychologyIcon from "@mui/icons-material/Psychology";
import useTheme from "../customHooks/useTheme";
import Timer from "./Timer";

import { MaterialUISwitch } from "./ThemeSwitch";

export default function ResponsiveAppBar({ timer }) {
  const [checked, setChecked] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const handleChange = () => {
    setChecked(!checked);
    toggleTheme();
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        marginBottom: "1rem",
        zIndex: "100",
        height: "8vh",
        ...theme.header,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: "3",
            }}
          >
            <PsychologyIcon sx={{ display: { xs: "flex" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                ...theme.typography,
              }}
            >
              Wordle
            </Typography>
          </Box>
          <Box sx={{ flexGrow: "1", display: "flex", flexDirection: "row" }}>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  color="primary"
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label=""
            />
            {timer !== 0 && <Timer timer={timer} />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
