import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import { useState } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const buildingImage = `/building_${Math.floor(Math.random() * 10) + 1}.PNG`;

const ForgotPassword = () => {
  const [forgotValue, setForgotValue] = useState({ email: "" });

  // The page switches depending on whether the email has been sent or not
  const [verificationSent, setverificationSent] = useState(false);

  const theme = createTheme();
  const history = useHistory();

  const handleChange = (e) => {
    setForgotValue({ ...forgotValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forgotValue.email === "") {
      toast.error("Kindly enter email");
    } else {
      const url = process.env.REACT_APP_API_URL + `/api/user/password-reset`;
      axios
        .post(url, forgotValue, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.success("Password reset mail has been sent");
          setForgotValue({ email: "" });
          setTimeout(() => {
            setverificationSent(true);
          }, 1000);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {verificationSent ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            component={Paper}
            elevation={6}
            square
          >
            <div className="container">
              <div className="row row-center">
                <div className="card card-center">
                  <div className="card-body">
                    <HiOutlineMailOpen className="big-icon" />
                    <h2 className="text-center">
                      A link has been sent to your account
                    </h2>
                    <div className="divider py-1 primary-background-color"></div>
                    <p className="margin-top-bottom-2">
                      Pleae click on the link that has been sent to your email
                      account to change your password
                    </p>
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Link to="/" variant="body2">
                          Go to login page
                        </Link>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
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
                Forgot Password
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  value={forgotValue.email}
                  onChange={handleChange}
                />
                <TextField style={{ visibility: "hidden", height: 0 }} />
                <TextField style={{ visibility: "hidden", height: 0 }} />
                <Button
                  className="primary-button-2"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Send
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link to="/" variant="body2">
                      Go to login page
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default ForgotPassword;
