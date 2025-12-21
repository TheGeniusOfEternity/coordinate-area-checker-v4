import type { ShotFormData } from "@/components/forms/shotform/ShotForm.tsx";
import { ShotsResolver } from "@/api/resolvers/shots.resolver.ts";
import { setToastMessage } from "@/store/slices/toastSlice.ts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { shotAdded, shotsSynced } from "@/store/slices/shotSlice.ts";
import { shotSocketUtil } from "@/utils/ShotSocketUtil.ts";

export const useShots = () => {
  const dispatch = useDispatch();

  const shotSubmit = async (
    userId: number,
    data: ShotFormData
  ) => {
    const shotsResolver = new ShotsResolver();
    const response = await shotsResolver.create({
      userId,
      ...data,
    });
    if (!response.data || typeof response.data === "string") {
      dispatch(
        setToastMessage({
          severity: "error",
          summary: `request.common.error.summary`,
          detail: response.data,
        }),
      );
    }
  };

  useEffect(() => {
    shotSocketUtil.connect();

    shotSocketUtil.onShotAdded = (shot) => {
      dispatch(shotAdded(shot));
    };

    shotSocketUtil.onShotsSync = (shots) => {
      dispatch(shotsSynced(shots));
    };

    return () => {
      shotSocketUtil.disconnect();
      shotSocketUtil.onShotAdded = null;
      shotSocketUtil.onShotsSync = null;
    };
  }, [dispatch]);

  return {
    shotSubmit
  };
};