import type { ShotFormData } from "@/components/forms/shotform/ShotForm.tsx";
import { setToastMessage } from "@/store/slices/toastSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { shotAdded, shotsSynced } from "@/store/slices/shotSlice.ts";
import { shotSocketUtil } from "@/utils/ShotSocketUtil.ts";
import type { RootState } from "@/store";

export const useShots = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  const shotSubmit = (data: ShotFormData) => {
    const response = shotSocketUtil.sendShot(data);
    if (!response) {
      dispatch(
        setToastMessage({
          severity: "error",
          summary: `request.common.error.summary`,
          detail: "",
        }),
      );
    }
  };

  useEffect(() => {
    if (token) {
      shotSocketUtil.setToken(token);
      shotSocketUtil.connect();

      shotSocketUtil.onShotAdded = (shot) => {
        dispatch(shotAdded(shot));
      };

      shotSocketUtil.onShotsSync = (shots) => {
        dispatch(shotsSynced(shots));
      };
    }

    return () => {
      shotSocketUtil.disconnect();
      shotSocketUtil.onShotAdded = null;
      shotSocketUtil.onShotsSync = null;
    };
  }, [dispatch, token]);

  return {
    shotSubmit
  };
};