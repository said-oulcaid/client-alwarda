import { Route } from "react-router-dom";
import Login from "./Login";


export const loginRoutes = (
    <Route path="/auth/login" element={<Login/>} />
)