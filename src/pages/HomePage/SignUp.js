import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, setEmail } from "../../redux/features/auth";
import { setInitialState } from "../../redux/features/property";
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

const SignUp = () => {
  const theme = createTheme();
  const [signUpValue, setSignUpValue] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const history = useHistory();

  // Set propertyList to empty array instead of null so it doesn't crash
  dispatch(setInitialState([]));

  const handleChange = (e) => {
    setSignUpValue({ ...signUpValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUpValue.username === "") {
      toast.error("Kindly enter username");
    } else if (signUpValue.email === "") {
      toast.error("Kindly enter email");
    } else if (signUpValue.password === "") {
      toast.error("Kindly enter password");
    } else {
      const url = process.env.REACT_APP_API_URL + "/api/user/signup";
      axios
        .post(url, signUpValue, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const url2 = process.env.REACT_APP_API_URL + `/api/user/verify`;
          axios
            .put(url2, signUpValue, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(() => {
              dispatch(setEmail(res.data.message.email));
              dispatch(login(res.data.message));
              history.push("/");
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              return err;
            });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          return err;
        });
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

  return (
    <div>
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
                Sign Up
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
                  value={signUpValue.username}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  value={signUpValue.email}
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
                  value={signUpValue.password}
                  onChange={handleChange}
                />
                <Button
                  className="primary-button-2"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    By clicking Sign Up, you agree to the our{" "}
                    <Link to="/privacy-policy" variant="body2" className="primary-color">
                      Privacy Policy
                    </Link>
                  </Grid>
                  <Grid item>
                    Already have an account?{" "}
                    <Link to="/login" variant="body2" className="primary-color">
                      Log in
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 3 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default SignUp;
