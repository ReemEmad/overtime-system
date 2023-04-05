import { useEffect } from "react";
import { appRoutes } from "../data/constants/appRoutes";
import { UserRoles } from "../data/DTO/Roles";
import useLocalStorage from "./useLocalStorage";

const useRoleRedirect = (
  allowedRoles: UserRoles[],
  redirectUrl: appRoutes,
  navigate: any
) => {
  useEffect(() => {
    // check the user's role here
    const userRole = getUserRole();

    if (!allowedRoles.includes(userRole)) {
      navigate(redirectUrl);
    }
  }, [allowedRoles, redirectUrl, history]);

  return;
};

const getUserRole = () => {
  const [user] = useLocalStorage("userData", {});
  return user.role;
};

export default useRoleRedirect;
