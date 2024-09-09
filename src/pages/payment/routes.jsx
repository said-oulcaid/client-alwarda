import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import LayoutPayment from "./Layout";
import Show from "./Show";
import Index from "./Index";
import List from "./List";
import Edite from "./Edite";

export const paymentRoutes = (
  <Route path="/" element={<Layout />}>
    <Route path="paiements" element={<LayoutPayment />}>
      <Route index element={<Index />} />

      <Route path="primaire" element={<List schoolType="ECOLE_PRIMAIRE" />} />
      <Route path="primaire/show/:id" element={<Show />} />
  

      <Route path="college" element={<List schoolType="COLLEGE" />} />
      <Route path="college/show/:id" element={<Show />} />
     

      <Route path="lycee" element={<List schoolType="LYCEE" />} />
      <Route path="lycee/show/:id" element={<Show />} />
      
      <Route path="edit/:id" element={<Edite />} />

    </Route>
  </Route>
);
