import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Intercept requests: attach access_token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ✅ Intercept responses: handle token expiration (401)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 due to expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
                try {
                    const res = await axios.post(`${API_BASE_URL}/user/refresh-token`, {
                        refresh_token: refreshToken,
                    });

                    localStorage.setItem("access_token", res.data.access_token);
                    localStorage.setItem("refresh_token", res.data.refresh_token); // ✅ update it
                    originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
                    return api(originalRequest);
                } catch (err) {
                    console.error("Refresh token failed:", err);
                    localStorage.clear();
                    window.location.href = "/";
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
