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
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import useCustomTheme from "../customHooks/useTheme";
import useForm from "../customHooks/useForm";
import useAuth from "../customHooks/useAuth";
import Loader from "./Loader";

type SignupFormProps = {
  firstName: { value: string };
  lastName: { value: string };
  email: { value: string };
  password: { value: string };
};
const initialValues: SignupFormProps = {
  firstName: { value: "" },
  lastName: { value: "" },
  email: { value: "" },
  password: { value: "" },
};

function Signup(): ReactElement {
  const { signup, loading, error } = useAuth();
  const [values, onChange, onSubmit] = useForm<SignupFormProps>(
    initialValues,
    formSubmitApi
  );
  // useEffect(() => {
  //   console.log("in useEffect");
  //   return () => {
  //     clearError();
  //   };
  // }, [clearError]);
  async function formSubmitApi() {
    await signup({
      firstName: values.firstName.value,
      lastName: values.lastName.value,
      email: values.email.value,
      password: values.password.value,
    });
  }
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
          onSubmit={onSubmit}
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
                  value={values.firstName.value}
                  type="text"
                  name="firstName"
                  onChange={onChange}
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
                  value={values.lastName.value}
                  type="text"
                  name="lastName"
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
                  postion: "relative",
                  ...customTheme.typography,
                }}
                fullWidth={true}
              >
                <Box>Signup</Box>
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

export default Signup;
