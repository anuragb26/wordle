import React, { useState, ReactElement } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import PsychologyIcon from "@mui/icons-material/Psychology";
import useTheme from "../../customHooks/useTheme";
import Timer from "../Timer";
import { MaterialUISwitch } from "../ThemeSwitch";

type ResponsiveAppBarTypes = {
  timer: number;
  onTimerEnd: () => void;
};

export default function ResponsiveAppBar({
  timer,
  onTimerEnd,
}: ResponsiveAppBarTypes): ReactElement {
  const [checked, setChecked] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const handleChange = () => {
    setChecked(!checked);
    toggleTheme();
  };
  const { header = {}, typography = {} } = theme;

  return (
    <AppBar
      position="fixed"
      sx={{
        marginBottom: "1rem",
        zIndex: "100",
        height: "8vh",
        ...header,
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
              width: "70%",
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
                ...typography,
              }}
            >
              Wordle
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", width: "15%" }}>
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
            {timer !== 0 && <Timer timer={timer} onTimerEnd={onTimerEnd} />}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              width: "15%",
            }}
          >
            <List
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            >
              <ListItem
                style={{
                  paddingLeft: "0px",
                  paddingRight: "0px",
                }}
              >
                <Button component={Link} to="/login" sx={{ ...typography }}>
                  Login
                </Button>
              </ListItem>
              <ListItem
                style={{
                  paddingLeft: "0px",
                  paddingRight: "0px",
                }}
              >
                <Button component={Link} to="/signup" sx={{ ...typography }}>
                  Signup
                </Button>
              </ListItem>
            </List>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
