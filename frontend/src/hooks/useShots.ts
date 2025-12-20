import type { ShotFormData } from "@/components/forms/shotform/ShotForm.tsx";
import { ShotsResolver } from "@/api/resolvers/shots.resolver.ts";
import { setToastMessage } from "@/store/slices/toastSlice.ts";
import { useDispatch } from "react-redux";

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
          summary: `request.shotSubmit.error.summary`,
          detail: `request.shotSubmit.error.detail`,
        }),
      );
    } else {
      dispatch(
        setToastMessage({
          severity: "success",
          summary: `request.shotSubmit.success.summary`,
          detail: `request.shotSubmit.success.detail`,
        }),
      );
    }
  };

  return {
    shotSubmit
  };
};