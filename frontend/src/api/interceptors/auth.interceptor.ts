import axios from "axios";
import { store } from "@/store";
import { setRefreshRequested } from "@/store/slices/authSlice.ts";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.status === 401 && store.getState().auth.accessToken !== null) {
      store.dispatch(setRefreshRequested(true));
    }
  },
);
