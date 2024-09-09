import axios from "axios"
export const request = axios.create({
    baseURL : process.env.REACT_APP_API_URL
})

request.interceptors.request.use(
    (config) => {
      const sessionUser = localStorage.getItem("session_user")
        ? JSON.parse(localStorage.getItem("session_user"))
        : null;
  
 
      if (sessionUser && sessionUser.token) {
        config.headers["Authorization"] = `Bearer ${sessionUser.token}`;
      }
  
      return config;
    },
    (error) => {
      // Handle error
      return Promise.reject(error);
    }
  );