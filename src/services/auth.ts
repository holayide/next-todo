import axios from "axios";

const api = axios.create({
  baseURL: "https://api.oluwasetemi.dev",
});

// Add access token to every request (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses (token expired)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        // Request new access token
        const { data } = await axios.post(
          "https://api.oluwasetemi.dev/auth/refresh",
          { refreshToken }
        );

        // Save new token
        localStorage.setItem("accessToken", data.accessToken);

        // Update header for retry
        api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        // Retry the failed request
        return api(originalRequest);
      } catch (err) {
        // Refresh failed → clear and redirect
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
