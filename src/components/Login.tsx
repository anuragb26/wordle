import React, { ReactElement } from "react";
import {
  Container,
  Grid,
  Input,
  FormControl,
  Button,
  Paper,
  Box,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import useCustomTheme from "../customHooks/useTheme";
import useForm from "../customHooks/useForm";
import useAuth from "../customHooks/useAuth";
import Loader from "./Loader";

type LoginFormProps = {
  password: { value: string };
  email: { value: string };
};
const initialValues: LoginFormProps = {
  password: { value: "" },
  email: { value: "" },
};
function Login(): ReactElement {
  const { theme: customTheme } = useCustomTheme();
  const { login, loading, error } = useAuth();
  const [values, onChange, onSubmit] = useForm<LoginFormProps>(
    initialValues,
    formSubmitApi
  );
  async function formSubmitApi() {
    await login({ email: values.email.value, password: values.password.value });
  }
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
          onSubmit={onSubmit}
          style={{ width: "100%", marginLeft: "1rem", marginRight: "1rem" }}
        >
          <Grid container={true}>
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
                  value={values.email.value}
                  type="email"
                  name="email"
                  onChange={onChange}
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
                  value={values.password.value}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                  fullWidth={true}
                />
              </FormControl>
            </Grid>
            <Grid item={true} xs={12} sx={{ mb: "16px" }}>
              <Button
                variant="outlined"
                type="submit"
                sx={{
                  position: "relative",
                  ...customTheme.typography,
                }}
                fullWidth={true}
              >
                <Box>Login</Box>
                {loading ? (
                  <Loader style={{ position: "absolute", right: "1em" }} />
                ) : null}
              </Button>
            </Grid>
            <Grid item={true} xs={12} sx={{ mb: "16px" }}>
              {error ? <Alert severity="error">{error}</Alert> : null}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
export default Login;
