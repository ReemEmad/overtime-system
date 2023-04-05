import { useState, useEffect } from "react";

function useAuthToken(initialValue: string | null) {
  const [authToken, setAuthToken] = useState<string | null>(initialValue);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  function removeAuthToken() {
    localStorage.removeItem("authToken");
  }

  return { authToken, setAuthToken, removeAuthToken };
}

export default useAuthToken;
