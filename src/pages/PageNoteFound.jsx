import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PageNoteFound = () => {
  useEffect(() => {
    document.title = "Alwarda | No Trouve ?";
  }, []);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="bg-gradient-to-r from-slate-200 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-black dark:text-white">
      <div className="flex items-center justify-center min-h-screen px-2">
        <div className="text-center">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-2xl font-medium mt-4">Oops! Page not found</p>
          <p className="mt-4 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button
            onClick={() => navigate(user ? "/" : "/auth/login")}
          >
            Go Back Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageNoteFound;
