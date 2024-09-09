import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import List from "./List";
import Show from "./Show";

export const centerRoutes = (
    <Route path="/centres" element={<Layout/>}>
        <Route index element={<List/>}/>
        <Route path="/centres/show/:id" element={<Show/>}/>
    </Route>

)