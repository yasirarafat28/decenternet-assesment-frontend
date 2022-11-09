export const getTokenFromCache = () =>
  localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY || "");
sessionStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY || "");

export const setTokenToLocalStorage = (token) =>
  localStorage.setItem(
    process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY || "",
    `Bearer ${token}`
  );

export const setTokenToSessionStorage = (token) =>
  sessionStorage.setItem(
    process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY || "",
    `Bearer ${token}`
  );

export const removeTokenFromCache = () => {
  sessionStorage.removeItem(
    process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY || ""
  );
  localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY || "");
};
