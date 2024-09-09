import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import List from "./List";

export const subjectRoutes = (
    <Route path="/matiéres" element={<Layout/>}>
        <Route index element={<List/>}/>
    </Route>

)