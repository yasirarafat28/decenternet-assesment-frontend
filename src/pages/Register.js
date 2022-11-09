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
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/inc/Footer";
import Header from "../components/inc/Header";
import { setTokenToLocalStorage } from "../utils/localStorage";
function Register() {
  const initErrors = {
    name: null,
    email: null,
    password: null,
  };
  const [errors, setErrors] = useState(initErrors);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const mutation = useMutation((formData) => {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, formData)
      .then((response) => {
        console.log(response.data);
        setTokenToLocalStorage(response?.data?.token);
        navigate("/books");
      })
      .catch((error) => {
        setErrors(error?.response?.data?.errors);
      });
  });

  const submitForm = (data) => {
    setErrors(initErrors);
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
                <h2>Register</h2>
                <div>
                  <div className="left-area">
                    <form onSubmit={handleSubmit((data) => submitForm(data))}>
                      <FormControl sx={{ mb: 2 }} fullWidth>
                        <FormLabel>Password</FormLabel>
                        <TextField
                          placeholder="Enter Name"
                          {...register("name")}
                          error={errors?.name?.length}
                          helperText={errors?.name?.[0]}
                        />
                      </FormControl>
                      <br />
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
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel>Your Username</FormLabel>
                        <TextField
                          type="text"
                          placeholder="Enter Your Username "
                          {...register("username")}
                          error={errors?.username?.length}
                          helperText={errors?.username?.[0]}
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
                          "Register"
                        )}
                      </Button>

                      <br />
                      <hr />

                      <p id="nav" className="over-h">
                        Don't have an account yet?
                        <span style={{ marginLeft: "10px" }}>
                          <Link to="/login">Login</Link>
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

export default Register;
