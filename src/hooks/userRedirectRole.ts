import { useEffect, useState } from "react";
import { appRoutes } from "../data/constants/appRoutes";
import { UserRoles } from "../data/DTO/Roles";
import useLocalStorage from "./useLocalStorage";

const useRoleRedirect = (
  allowedRoles: UserRoles[],
  redirectUrl: appRoutes,
  navigate: any
) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    // check the user's role here
    const userRole = getUserRole();
    const authorized = allowedRoles.includes(userRole);

    if (!authorized) {
      navigate(redirectUrl);
      setIsAuthorized(authorized);
    }
  }, [allowedRoles, redirectUrl, history]);

  return isAuthorized;
};

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("userData") ?? "");
  return user.role;
};

export default useRoleRedirect;
