import { Box, Button, CircularProgress, Toolbar } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { removeTokenFromCache } from "../../utils/localStorage";
const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation((formData) => {
    return axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
        headers: {
          Authorization: auth?.token,
        },
      })
      .then((response) => {
        removeTokenFromCache(auth?.token);
        auth.unAuthenticate();
        navigate("/login");
      })
      .catch((error) => {});
  });

  const handleLogout = (event) => {
    mutate();
  };
  return (
    <>
      <header className="header nav-fixed">
        <div className="overlay"></div>
        <div className="container mainmenu-area">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <div className="navbar-brand" href="#">
                <img src="/logo.png" alt="" />
              </div>
            </Box>
            <p className="nav-item">
              <Link to={`/`}>Home</Link>
            </p>
            {!auth?.user ? (
              <>
                <p className="nav-item">
                  <Link to={`/login`}>Login</Link>
                </p>
                <p className="nav-item">
                  <Link to={`/register`}>Register</Link>
                </p>
              </>
            ) : (
              <>
                <p className="nav-item">
                  <Link to={`/books`}>Books</Link>
                </p>
                <p className="nav-item">
                  Hi {auth.user.username},{" "}
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={handleLogout}
                  >
                    {isLoading ? <CircularProgress size={20} /> : "Logout"}
                  </Button>
                </p>
              </>
            )}
          </Toolbar>
        </div>
      </header>
      <div className="clearfix"></div>
    </>
  );
};

export default Header;
