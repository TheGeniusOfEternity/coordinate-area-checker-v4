import axios from "axios";
import { store } from "@/store";
import { setRefreshRequested } from "@/store/slices/authSlice.ts";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url;
    const isAuthEndpoint =
      url?.includes("/auth/login") || url?.includes("/auth/register");

    if (error.response.data.status === 401 && !isAuthEndpoint) {
      store.dispatch(setRefreshRequested(true));
    }
  },
);
