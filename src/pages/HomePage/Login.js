import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { getUser, loginSlice } from "../../redux/features/auth";
import {
  setInitialState,
  getPropertyList,
} from "../../redux/features/property";
import "./styles.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from '@mui/material/Link';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const buildingImage = `/building_${Math.floor(Math.random() * 10) + 1}.PNG`;

const Login = () => {
  const theme = createTheme();
  const cryptoJS = require("crypto-js");
  const dispatch = useDispatch();

  const [loginValue, setLoginValue] = useState({
    username: localStorage.getItem("remember")
      ? JSON.parse(localStorage.getItem("remember")).username
      : "",
    password: localStorage.getItem("remember")
      ? JSON.parse(
          cryptoJS.AES.decrypt(
            JSON.parse(localStorage.getItem("remember")).password,
            process.env.REACT_APP_JWT_SECRET
          ).toString(cryptoJS.enc.Utf8)
        )
      : "",
    remember: localStorage.getItem("remember") ? true : false,
  });

  // Set propertyList to empty array instead of null so it doesn't crash
  dispatch(setInitialState([]));
  const handleChange = (e) => {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginValue.username === "") {
      toast.error("Kindly enter username");
    } else if (loginValue.password === "") {
      toast.error("Kindly enter password");
    } else {
      try {
        const user = await dispatch(getUser(loginValue));
        // Fetch property list from database
        loginValue.remember
          ? localStorage.setItem(
              "remember",
              JSON.stringify({
                username: loginValue.username,
                password: cryptoJS.AES.encrypt(
                  JSON.stringify(loginValue.password),
                  process.env.REACT_APP_JWT_SECRET
                ).toString(),
                value: true,
              })
            )
          : localStorage.removeItem("remember");
        await dispatch(getPropertyList(unwrapResult(user)));
      } catch (err) {
        // handle error here
        toast.error("Incorrect username or password. Please try again.");
        localStorage.removeItem("remember");
      }
    }
  };

  const Copyright = (props) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" to="/" className="primary-color">
          <b>Prim6LLC</b>
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  const rememeberMeHandleChange = (e) => {
    setLoginValue({ ...loginValue, remember: e.target.checked });
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${buildingImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#614092" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                required
                fullWidth
                autoFocus
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                margin="normal"
                value={loginValue.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={loginValue.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    name="remember"
                    id="remember"
                    checked={loginValue.remember}
                  />
                }
                label="Remember me"
                onChange={rememeberMeHandleChange}
              />
              <Button
                className="primary-button-2"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot" variant="body2" className="primary-color">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2" className="primary-color">
                    Don't have an account?
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 3 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
