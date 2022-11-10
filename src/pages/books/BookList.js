import {
  Box,
  Button,
  FormControl,
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Footer from "../../components/inc/Footer";
import Header from "../../components/inc/Header";
import { AuthContext } from "../../provider/AuthProvider";

function BookList() {
  const auth = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState("");

  const { isLoading, refetch, isFetched, isRefetching } = useQuery(
    "booklist",
    () => {
      return axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/book?page=${page}&q=${search}`,
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        )
        .then((response) => {
          let responseData = response?.data?.data;
          setBooks(responseData?.docs);
          setMeta({
            totalDocs: responseData.totalDocs,
            limit: responseData.limit,
            totalPages: responseData.totalPages,
            page: responseData.page,
            pagingCounter: responseData.pagingCounter,
          });
        })
        .catch((error) => {
          if (error.response.status == 401) {
            auth.unAuthenticate();
            window.location = "/login";
          }
        });
    }
  );
  useEffect(() => {
    refetch();
  }, [page, search, limit]);

  function deleteHandler(id) {
    return axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/book/${id}`, {
        headers: {
          Authorization: auth?.token,
        },
      })
      .then((response) => {
        refetch();
      })
      .catch((error) => {});
  }
  console.log(isRefetching);
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <section className="content-section">
          <div className="container">
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <h3>
                  Books{" "}
                  <Link to={`/books/create`}>
                    <Button variant="contained" color="primary" size="small">
                      Create
                    </Button>
                  </Link>
                </h3>
              </Box>

              <FormControl>
                <TextField
                  type="text"
                  placeholder="Search "
                  name="q"
                  size="small"
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                />
              </FormControl>
            </Toolbar>

            <div className="box">
              <div className="col-lg-12">
                {isLoading ? (
                  <Skeleton variant="rectangular" height={200} />
                ) : (
                  <>
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Edition</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Language</TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {books.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.edition}</TableCell>
                              <TableCell align="right">{row.author}</TableCell>
                              <TableCell align="right">
                                {row.language}
                              </TableCell>
                              <TableCell align="right">
                                <>
                                  <Link to={`/books/${row.id}`}>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      size="medium"
                                    >
                                      View
                                    </Button>
                                  </Link>
                                  <Link to={`/books/${row.id}/edit`}>
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      size="small"
                                    >
                                      Edit
                                    </Button>
                                  </Link>

                                  <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => {
                                      deleteHandler(row.id);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {!Number(books.length) && !isRefetching && (
                      <h4 style={{ width: "100%", textAlign: "center" }}>
                        No records found
                      </h4>
                    )}
                    {Number(meta?.totalPages) > 1 && (
                      <Pagination
                        component="div"
                        count={meta?.totalPages}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={(event, pageNumber) => {
                          setPage(pageNumber);
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default BookList;
