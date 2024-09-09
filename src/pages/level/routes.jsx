import { Route } from "react-router-dom";
import List from "./List";
import Show from "./Show";
import Layout from "../../layout/Layout";

export const levelRoutes = (
    <Route path="/niveaux" element={<Layout/>}>
        <Route index element={<List/>}/>
        <Route path="/niveaux/show/:id" element={<Show/>}/>
    </Route>
)