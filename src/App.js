import { Navigate, Route, Routes } from "react-router-dom";
import { centerRoutes } from "./pages/centre/routes";
import { homeRoutes } from "./pages/home/routes";
import { studentRoutes } from "./pages/student/routes";
import { utilisateurRoutes } from "./pages/user/routes";
import { teacherRoutes } from "./pages/teacher/routes";
import { levelRoutes } from "./pages/level/routes";
import { subjectRoutes } from "./pages/subject/routes";
import { loginRoutes } from "./pages/auth/router";

import PageNoteFound from "./pages/PageNoteFound";
import { paymentRoutes } from "./pages/payment/routes";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        {user ? (
          <>
            {homeRoutes}
            {centerRoutes}
            {studentRoutes}
            {utilisateurRoutes}
            {teacherRoutes}
            {levelRoutes}
            {subjectRoutes}
            {paymentRoutes}
            <Route path="/auth/login" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {loginRoutes}
            <Route path="/" element={<Navigate to="/auth/login" />} />
          </>
        )}
        <Route path="*" element={<PageNoteFound />} />
      </Routes>
    </>
  );
};

export default App;
