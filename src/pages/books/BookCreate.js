import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/inc/Footer";
import Header from "../../components/inc/Header";
import { AuthContext } from "../../provider/AuthProvider";

const initErrors = {
  name: null,
  author: null,
  language: null,
  edition: null,
};
function BookCreate() {
  const auth = useContext(AuthContext);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(initErrors);
  const mutation = useMutation((formData) => {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/book`, formData, {
        headers: {
          Authorization: auth?.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/books`);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          auth.unAuthenticate();
          window.location = "/login";
        }
        if (error?.response?.data?.errors?.length) {
          setErrors(error?.response?.data?.errors);
        }
        setMessage(error?.response?.data?.message);
      });
  });

  const submitForm = (data) => {
    setErrors(initErrors);
    setMessage(null);
    mutation.mutate(data);
  };
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <section className="content-section">
          <div className="auth-container">
            <h3>Create Book</h3>
            <Card sx={{ my: 3 }}>
              <div className="contact-area">
                <div>
                  {message ? (
                    <div className="alert alert-danger">{message}</div>
                  ) : (
                    ""
                  )}
                  <div className="left-area">
                    <form onSubmit={handleSubmit((data) => submitForm(data))}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel>Name </FormLabel>
                        <TextField
                          type="text"
                          placeholder="Enter Name "
                          {...register("name")}
                          error={errors?.email?.length}
                          helperText={errors?.email?.[0]}
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel>Author </FormLabel>
                        <TextField
                          type="text"
                          placeholder="Enter Author "
                          {...register("author")}
                          error={errors?.author?.length}
                          helperText={errors?.author?.[0]}
                        />
                        {errors?.author?.length}
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel>Edition </FormLabel>
                        <TextField
                          type="text"
                          placeholder="Enter Edition "
                          {...register("edition")}
                          error={errors?.email?.length}
                          helperText={errors?.email?.[0]}
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel>Language </FormLabel>
                        <TextField
                          type="text"
                          placeholder="Enter Language "
                          {...register("language")}
                          error={errors?.email?.length}
                          helperText={errors?.email?.[0]}
                        />
                      </FormControl>
                      <Button
                        sx={{ px: 5, mt: 3, color: "#fff" }}
                        className="btn btn-success btn-corner ml-auto"
                        type="submit"
                        disabled={mutation.isLoading}
                      >
                        {mutation.isLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          "Submit"
                        )}
                      </Button>
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

export default BookCreate;
