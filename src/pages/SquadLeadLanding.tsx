import React from "react";
import { UserRoles } from "../data/DTO/Roles";
import { appRoutes } from "../data/constants/appRoutes";
import useRoleRedirect from "../hooks/userRedirectRole";
import { useNavigate } from "react-router-dom";

function SquadLeadLanding() {
  const navigate = useNavigate();

  const isAuthorized = useRoleRedirect(
    [UserRoles.SquadLead],
    appRoutes.SIGN_IN,
    navigate
  );
  return <div style={{ marginLeft: "50%" }}>Squad Lead Landing</div>;
}

export default SquadLeadLanding;
