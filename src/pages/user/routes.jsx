import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import List from "./List";
import Show from "./Show";

export const utilisateurRoutes = (
    <Route path="/utilisateurs" element={<Layout/>}>
        <Route index element={<List/>}/>
        <Route path="/utilisateurs/show/:id" element={<Show/>}/>
    </Route>

)