import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authenticated from "./middleware/Authenticated";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { QueryClientProvider } from "react-query";
import queryClient from "./config/queyClient.config";
import BookCreate from "./pages/books/BookCreate";
import BookDetails from "./pages/books/BookDetails";
import BookList from "./pages/books/BookList";
import BookUpdate from "./pages/books/BookUpdate";
import ErrorPage from "./pages/ErrorPage";
import AuthContextProvider from "./provider/AuthProvider";

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>

            {/* Service List */}
            <Route
              path="/books"
              element={
                <Authenticated>
                  <BookList />
                </Authenticated>
              }
            ></Route>
            <Route
              path="/books/create"
              element={
                <Authenticated>
                  <BookCreate />
                </Authenticated>
              }
            ></Route>
            <Route
              path="/books/:id"
              element={
                <Authenticated>
                  <BookDetails />
                </Authenticated>
              }
            ></Route>
            <Route
              path="/books/:id/edit"
              element={
                <Authenticated>
                  <BookUpdate />
                </Authenticated>
              }
            ></Route>

            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
