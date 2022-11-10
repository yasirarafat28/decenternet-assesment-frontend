import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { removeTokenFromCache } from "../utils/localStorage";

function Authenticated(props) {
  const { children, role } = props;
  let [authenticated, setAuthenticated] = useState(false);
  let [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (auth?.user) {
      setAuthenticated(true);
      setLoading(false);
    } else if (auth?.token) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/profile/info`, {
          headers: {
            Authorization: auth?.token,
          },
        })
        .then((response) => {
          auth.setAuthUser(response.data?.data);
          setAuthenticated(true);
        })
        .catch((error) => {
          console.log(error.message);
          removeTokenFromCache(auth?.token);
          if (error.response.status === 401) {
            auth.unAuthenticate();
            window.location = "/login";
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return;
  }
  if (!authenticated) {
    return <Navigate to={`/login`} />;
  }
  return children;
}
export default Authenticated;
