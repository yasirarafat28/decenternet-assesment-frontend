import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import Footer from "../components/inc/Footer";
import Header from "../components/inc/Header";
import { setTokenToLocalStorage } from "../utils/localStorage";
function Login() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const mutation = useMutation(async (formData) => {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, formData)
      .then((response) => {
        console.log(response.data);
        setTokenToLocalStorage(response?.data?.data?.token);
        console.log(response?.data?.data?.token);
        window.location = "/books";
      })
      .catch((error) => {
        if (error?.response?.data?.errors?.length) {
          setErrors(error?.response?.data?.errors);
        }
        setMessage(error?.response?.data?.message);
      });
  });

  const submitForm = (data) => {
    setErrors({
      email: null,
      password: null,
    });
    setMessage(null);
    mutation.mutate(data);
  };

  return (
    <>
      <Header />
      <div className="content-wrapper">
        <section className="content-section">
          <div className="auth-container">
            <Card sx={{ my: 3 }}>
              <div className="contact-area">
                <h2>Login to Your Account!</h2>
                <div>
                  {message ? (
                    <div className="alert alert-danger">{message}</div>
                  ) : (
                    ""
                  )}
                  <div className="left-area">
                    <form onSubmit={handleSubmit((data) => submitForm(data))}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel>Your Email </FormLabel>
                        <TextField
                          type="text"
                          placeholder="Enter Your Email "
                          {...register("email")}
                          error={errors?.email?.length}
                          helperText={errors?.email?.[0]}
                        />
                      </FormControl>
                      <br />
                      <FormControl fullWidth>
                        <FormLabel>Password</FormLabel>
                        <TextField
                          placeholder="Enter Password"
                          type="password"
                          {...register("password")}
                          error={errors?.password?.length}
                          helperText={errors?.password?.[0]}
                        />
                      </FormControl>

                      <br />
                      <Button
                        sx={{ px: 5, mt: 3, color: "#fff" }}
                        className="btn btn-success btn-corner ml-auto"
                        type="submit"
                        disabled={mutation.isLoading}
                      >
                        {mutation.isLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          "Login"
                        )}
                      </Button>

                      <br />
                      <hr />

                      <p id="nav" className="over-h">
                        Don't have an account yet?
                        <span style={{ marginLeft: "10px" }}>
                          <Link to="/register">Register</Link>
                        </span>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Login;
