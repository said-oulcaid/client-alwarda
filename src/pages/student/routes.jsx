import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import List from "./List";
import Show from "./Show";

export const studentRoutes = (
    <Route path="/eleves" element={<Layout/>}>
        <Route index element={<List/>}/>
        <Route path="/eleves/show/:id" element={<Show/>}/>
    </Route>

)