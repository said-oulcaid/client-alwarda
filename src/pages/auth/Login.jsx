import { useEffect, useState } from "react";
import ToggleThem from "../../components/ToggleThem";
import { Button, Input } from "@nextui-org/react";
import { LuMail } from "react-icons/lu";
import { FaUnlockAlt } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/api/authApi";
import { formatErrorField } from "../../utils/utils";
import { authActions } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  useEffect(() => {
    document.title = "Alwarda | Connection";
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { errorValidation, loading } = useSelector((state) => state.auth);
  const handelChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    dispatch(authActions.setErrorValidation(null));
  };
  const handelSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser(formData, () => {
        console.log('Callback executed');
        setFormData({
          email: "",
          password: "",
        });
       navigate("/");
      })
    );
  };
  return (
    <section className="h-screen flex justify-center items-center dark:text-white text-gray-900 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute  top-0 grid grid-cols-12 text-center overflow-hidden gap-6"></div>
      <form
        onSubmit={handelSubmit}
        className="bg-white rounded-lg shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] p-5 relative flex flex-col space-y-3 min-w-[320px] w-[420px]   sm:w-[530px] mx-3 dark:bg-gray-700"
      >
        <div className="absolute top-5 right-5">
          <ToggleThem size="sm" />
        </div>

        <div>
          <h1 className="font-bold text-3xl flex flex-col justify-center items-center">
            <HiMiniUserGroup size={40} />
            <span>Se connecter</span>
          </h1>
        </div>

        <Input
          autoFocus
          endContent={
            <LuMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
          type="email"
          value={formData.email}
          onChange={(e) => handelChange("email", e.target.value)}
          isInvalid={
            errorValidation &&
            formatErrorField(errorValidation, "email") &&
            true
          }
          errorMessage={
            errorValidation &&
            formatErrorField(errorValidation, "email") && (
              <ol>
                {formatErrorField(errorValidation, "email").map((e) => (
                  <li>-{e}</li>
                ))}
              </ol>
            )
          }
        />
        <Input
          endContent={
            <FaUnlockAlt className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
          value={formData.password}
          onChange={(e) => handelChange("password", e.target.value)}
          isInvalid={
            errorValidation &&
            formatErrorField(errorValidation, "password") &&
            true
          }
          errorMessage={
            errorValidation &&
            formatErrorField(errorValidation, "password") && (
              <ol>
                {formatErrorField(errorValidation, "password").map((e) => (
                  <li>-{e}</li>
                ))}
              </ol>
            )
          }
        />

        <Button color="primary" fullWidth type="submit" isLoading={loading}>
          Connecter
        </Button>
      </form>
    </section>
  );
};

export default Login;
