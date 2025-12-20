import { store } from "@/store";
import ApiResolverUtil from "@/utils/ApiResolverUtil.ts";
import type { CommonResponseDto } from "@/api/dto/common/common-response.dto.ts";
import type { ShotResponseDto } from "@/api/dto/shots/shot-response.dto.ts";

export class ShotsResolver {
  private apiResolver = new ApiResolverUtil("shots");
  private token = store.getState().auth.accessToken;

  public async getAll() {
    return await this.apiResolver.request<
      null,
      CommonResponseDto<ShotResponseDto[] | string>
    >(
      "",
      "GET",
      null,
      this.token ? this.token : null,
    );
  }
}