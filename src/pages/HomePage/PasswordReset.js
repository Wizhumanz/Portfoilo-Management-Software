import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocation, Link } from "react-router-dom";
import { VscWarning } from "react-icons/vsc";
import axios from "axios";
import Grid from "@mui/material/Grid";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState({ password: "" });
  const [passwordIsUpdated, setPasswordIsUpdated] = useState(false);
  const [linkExpired, setLinkExpired] = useState(false);

  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  const history = useHistory();

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + `/api/user/validate-token`;
    axios
      .post(url, newPassword, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .catch((err) => {
        setLinkExpired(true);
        console.log(err.response.data.message);
      });
  }, []);

  const handleChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url =
      process.env.REACT_APP_API_URL +
      `/api/user/password-verify?token=${token}`;
    axios
      .post(url, newPassword, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPasswordIsUpdated(true);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleUpdate = () => {
    history.push("/login");
  };

  return (
    <div>
      {linkExpired ? (
        <main>
          <div className="container">
            <div className="row">
              <div className="card card-center">
                <div className="card-body delete-popup">
                  <VscWarning className="delete-icon" />
                  <h2>This password reset link has expired.</h2>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link to="/forgot" variant="body2">
                        Try resetting your password again.
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div>
          {passwordIsUpdated ? (
            <main>
              <div className="container">
                <div className="row">
                  <div className="card card-center">
                    <div className="card-body">
                      <h2 className="text-center">
                        Password has been successfully updated!
                      </h2>
                      <div className="text-center">
                        <button
                          type="button"
                          className="primary-button-2"
                          onClick={handleUpdate}
                        >
                          Continue to login page
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          ) : (
            <main>
              <div className="container">
                <div className="row">
                  <div className="card card-center">
                    <div className="card-body">
                      <h2>Reset Password</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="updatePassword">New password</label>
                          <input
                            value={newPassword.password}
                            onChange={handleChange}
                            type="password"
                            name="password"
                            className="form-control"
                            id="updatePassword"
                            aria-describedby="updatePassword"
                          />
                        </div>
                        <div className="text-center">
                          <button type="submit" className="primary-button">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
