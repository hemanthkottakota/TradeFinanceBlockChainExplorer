import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "./api";
import { clearAuth, getAccessToken, getUserProfile, setUserProfile } from "./auth";

function AuthGuard({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const checkUser = async () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        setStatus("unauthorized");
        return;
      }

      try {
        const response = await api.get("/users/me");
        setUserProfile(response.data);
        setStatus("authorized");
      } catch {
        clearAuth();
        setStatus("unauthorized");
      }
    };

    checkUser();
  }, []);

  if (status === "checking") {
    return <div style={{ padding: "2rem" }}>Validating session...</div>;
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AuthGuard;
