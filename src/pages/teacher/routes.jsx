import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import List from "./List";
import Show from "./Show";

export const teacherRoutes = (
    <Route path="/enseignats" element={<Layout/>}>
        <Route index element={<List/>}/>
        <Route path="/enseignats/show/:id" element={<Show/>}/>
    </Route>

)