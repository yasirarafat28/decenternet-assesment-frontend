import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormLabel,
  Skeleton,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/inc/Footer";
import Header from "../../components/inc/Header";
import { AuthContext } from "../../provider/AuthProvider";

const initErrors = {
  name: null,
  author: null,
  language: null,
  edition: null,
};
function BookUpdate() {
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [book, setBook] = useState({});
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(initErrors);
  const { register, handleSubmit } = useForm();

  const mutation = useMutation((formData) => {
    return axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/book/${id}`, formData, {
        headers: {
          Authorization: auth?.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/books`);
      })
      .catch((error) => {
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

  const { isLoading, refetch } = useQuery("book-info-for-update-page", () => {
    return axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/book/${id}`, {
        headers: {
          Authorization: auth?.token,
        },
      })
      .then((response) => {
        setBook(response?.data?.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <section className="content-section">
          <div className="auth-container">
            <h3>Update Book</h3>
            <Card sx={{ my: 3 }}>
              <div className="contact-area">
                <div>
                  {message ? (
                    <div className="alert alert-danger">{message}</div>
                  ) : (
                    ""
                  )}

                  {isLoading ? (
                    <Skeleton variant="rectangular" height={400} />
                  ) : (
                    <>
                      <div className="left-area">
                        {/* <form onSubmit={submitForm}> */}
                        <form
                          onSubmit={handleSubmit((data) => submitForm(data))}
                        >
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <FormLabel>Name </FormLabel>
                            <TextField
                              type="text"
                              placeholder="Enter Name "
                              {...register("name")}
                              error={errors?.email?.length}
                              helperText={errors?.email?.[0]}
                              defaultValue={book.name}
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
                              defaultValue={book.author}
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
                              defaultValue={book.edition}
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
                              defaultValue={book.language}
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
                              "Update"
                            )}
                          </Button>
                        </form>
                      </div>
                    </>
                  )}
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

export default BookUpdate;
