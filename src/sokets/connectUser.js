import { io } from "socket.io-client";

const sessionUser = localStorage.getItem("session_user")
  ? JSON.parse(localStorage.getItem("session_user"))
  : null;

const token = sessionUser ? sessionUser.token : null;


const socket = io(process.env.REACT_APP_API_URL, {
  auth: {
    token: token,  
  },
});

socket.on("connect", () => {
  console.log(`Connected to the server with socket ID: ${socket.id}`);
});

socket.on("message", (data) => {
  console.log("Message from server:", data);
});