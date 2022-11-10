import {
  Skeleton,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Footer from "../../components/inc/Footer";
import Header from "../../components/inc/Header";
import { AuthContext } from "../../provider/AuthProvider";

function BookDetails() {
  const { id } = useParams();
  console.log(id);
  const auth = useContext(AuthContext);
  const [book, setBook] = useState({});

  const { isLoading, refetch } = useQuery("book-info", () => {
    return axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/book/${id}`, {
        headers: {
          Authorization: auth?.token,
        },
      })
      .then((response) => {
        setBook(response?.data?.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          auth.unAuthenticate();
          window.location = "/login";
        }
      });
  });
  useEffect(() => {
    refetch();
  }, []);
  console.log(book);
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <section className="content-section">
          <div className="container auth-container">
            <h3>Book Information</h3>
            <div className="box">
              {isLoading ? (
                <Skeleton variant="rectangular" height={200} />
              ) : (
                <>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Name
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {book.name}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell component="th" scope="row">
                          Edition
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {book.edition}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Author
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {book.author}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Language
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {book.language}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Created At
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {book.createdAt}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </TableContainer>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default BookDetails;
