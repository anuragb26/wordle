import React, { useState, ReactElement } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Drawer from "@mui/material/Drawer";
import PsychologyIcon from "@mui/icons-material/Psychology";
import useTheme from "../../customHooks/useTheme";
import useDefaultTheme from "../../customHooks/useDefaultTheme";
import useAuth from "../../customHooks/useAuth";
import Timer from "../Timer";
import { MaterialUISwitch } from "../ThemeSwitch";
import useCounter from "../../customHooks/useCounter";

type ResponsiveAppBarTypes = {
  timer: number;
  onTimerEnd: () => void;
};

export default function ResponsiveAppBar({
  timer,
  onTimerEnd,
}: ResponsiveAppBarTypes): ReactElement {
  const { clearError } = useAuth();
  const { setTimer } = useCounter();
  const [checked, setChecked] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const [open, setState] = useState(false);
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };
  const handleChange = () => {
    setChecked(!checked);
    toggleTheme();
    toggleColorMode();
  };
  const { header = {}, typography = {} } = theme;
  const { toggleColorMode } = useDefaultTheme();
  const navigation = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row-reverse" },
        width: { sm: "100%", md: "15%" },
      }}
    >
      <List
        style={{
          display: "flex",
          paddingTop: "0px",
          paddingBottom: "0px",
        }}
        sx={{ flexDirection: { xs: "column", md: "row" } }}
      >
        <ListItem
          sx={{
            paddingLeft: { xs: "16px", md: "0px" },
            paddingRight: { xs: "16px", md: "0px" },
          }}
        >
          <Button
            component={Link}
            to="/login"
            sx={{ ...typography }}
            onClick={() => {
              clearError();
              setTimer(0);
            }}
          >
            Login
          </Button>
        </ListItem>
        <ListItem
          sx={{
            paddingLeft: { xs: "16px", md: "0px" },
            paddingRight: { xs: "16px", md: "0px" },
          }}
        >
          <Button
            component={Link}
            to="/signup"
            sx={{ ...typography }}
            onClick={() => {
              clearError();
              setTimer(0);
            }}
          >
            Signup
          </Button>
        </ListItem>
      </List>
    </Box>
  );
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
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ display: { sm: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "50%", sm: "70%" },
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
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navigation()}
          </Box>
          <Drawer
            //from which side the drawer slides in
            anchor="left"
            //if open is true --> drawer is shown
            open={open}
            //function that is called when the drawer should close
            onClose={toggleDrawer(false)}
          >
            <IconButton sx={{ mb: 2, pt: 2 }}>
              <CloseIcon onClick={toggleDrawer(false)} />
            </IconButton>
            {navigation()}
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
