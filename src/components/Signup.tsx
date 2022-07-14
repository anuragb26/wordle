import React, { ReactElement } from "react";
import {
  Container,
  Grid,
  Input,
  FormControl,
  Button,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import useCustomTheme from "../customHooks/useTheme";

function Signup(): ReactElement {
  const { theme: customTheme } = useCustomTheme();
  return (
    <Container
      maxWidth="sm"
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        display: "flex",
      }}
    >
      <Paper
        elevation={4}
        style={{
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...customTheme.paper,
        }}
      >
        <form
          onSubmit={() => {}}
          style={{ width: "100%", marginLeft: "1rem", marginRight: "1rem" }}
        >
          <Grid container={true}>
            <Grid
              item={true}
              xs={1}
              sx={{ mb: "16px", position: "relative", top: "4px" }}
            >
              <PermIdentityIcon />
            </Grid>
            <Grid item={true} xs={11} sx={{ mb: "16px" }}>
              <FormControl fullWidth={true}>
                <Input
                  placeholder="First Name"
                  value={""}
                  type="text"
                  name="firstName"
                  onChange={() => {}}
                  fullWidth={true}
                />
              </FormControl>
            </Grid>
            <Grid
              item={true}
              xs={1}
              sx={{ mb: "8px", position: "relative", top: "4px" }}
            >
              <PermIdentityIcon />
            </Grid>
            <Grid item={true} xs={11} sx={{ mb: "16px" }}>
              <FormControl fullWidth={true}>
                <Input
                  placeholder="Last Name"
                  value={""}
                  type="text"
                  name="lastName"
                  onChange={() => {}}
                  fullWidth={true}
                />
              </FormControl>
            </Grid>
            <Grid
              item={true}
              xs={1}
              sx={{ mb: "16px", position: "relative", top: "4px" }}
            >
              <EmailIcon />
            </Grid>
            <Grid item={true} xs={11} sx={{ mb: "16px" }}>
              <FormControl fullWidth={true}>
                <Input
                  placeholder="E-mail address"
                  value={""}
                  type="email"
                  name="email"
                  onChange={() => {}}
                  fullWidth={true}
                />
              </FormControl>
            </Grid>
            <Grid
              item={true}
              xs={1}
              sx={{ mb: "16px", position: "relative", top: "4px" }}
            >
              <PasswordIcon />
            </Grid>
            <Grid item={true} xs={11} sx={{ mb: "16px" }}>
              <FormControl fullWidth={true}>
                <Input
                  value={""}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={() => {}}
                  fullWidth={true}
                />
              </FormControl>
            </Grid>
            <Grid item={true} xs={12} sx={{ mb: "16px" }}>
              <Button
                variant="outlined"
                type="submit"
                sx={{
                  ...customTheme.typography,
                }}
                fullWidth={true}
              >
                Signup
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;
