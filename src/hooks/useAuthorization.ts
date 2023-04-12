import { useEffect, useState } from "react";

const useAuthorization = (permission: string) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    // perform authorization check here
    const hasPermission = checkAuthorization(permission);
    setIsAuthorized(hasPermission);
  }, [permission]);

  return isAuthorized;
};

const checkAuthorization = (permission: string) => {
  // your authorization logic goes here
  //   you can use localStorage or a server-side API to check if the user has the required permission
  //   return true if the user has the permission, false otherwise
  const user = JSON.parse(localStorage.getItem("userData") ?? "");
  console.log("~", user);
  return permission === user.role ? true : false;
};

export default useAuthorization;
