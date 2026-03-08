import axios from "axios";
import { clearAuth, getAccessToken, getRefreshToken, getUserProfile, setTokens } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  const profile = getUserProfile();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (profile?.org_name) {
    config.headers["X-Org-Name"] = profile.org_name;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const isAuthRoute = originalRequest?.url?.startsWith("/auth/");

    if (status !== 401 || originalRequest?._retry || isAuthRoute) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearAuth();
      return Promise.reject(error);
    }

    try {
      originalRequest._retry = true;
      const response = await refreshClient.post("/auth/refresh", {
        refresh_token: refreshToken,
      });
      setTokens(response.data.access_token, response.data.refresh_token);
      originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
      return api(originalRequest);
    } catch (refreshError) {
      clearAuth();
      return Promise.reject(refreshError);
    }
  }
);
