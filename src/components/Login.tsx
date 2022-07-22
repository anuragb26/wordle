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
import useCustomTheme from "../customHooks/useTheme";
import useForm from "../customHooks/useForm";

type LoginFormProps = {
  password: { value: string };
  email: { value: string };
};
const initialValues: LoginFormProps = {
  password: { value: "" },
  email: { value: "" },
};
function Login(): ReactElement {
  const formSubmitApi = () => {
    console.log("in submit");
  };
  const { theme: customTheme } = useCustomTheme();
  const [values, onChange, onSubmit] = useForm<LoginFormProps>(
    initialValues,
    formSubmitApi
  );
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
                  ...customTheme.typography,
                }}
                fullWidth={true}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
export default Login;
