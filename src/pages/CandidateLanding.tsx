import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../data/constants/appRoutes";

function CandidateLanding() {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate(appRoutes.SIGNOUT)}>Signout</Button>
      <div>CandidateLanding</div>
    </>
  );
}

export default CandidateLanding;
