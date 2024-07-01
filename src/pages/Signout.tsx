import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../data/constants/appRoutes";

function Signout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("userData");
    navigate(appRoutes.SIGN_IN);
  }, []);

  return <div>...</div>;
}

export default Signout;
