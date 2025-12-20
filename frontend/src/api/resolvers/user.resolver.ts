import ApiResolverUtil from "@/utils/ApiResolverUtil.ts";
import { store } from "@/store";
import type { CommonResponseDto } from "@/api/dto/common/common-response.dto.ts";
import type { UserResponseDto } from "@/api/dto/user/user-response.dto.ts";

export class AuthResolver {
  private apiResolver = new ApiResolverUtil("user");
  private token = store.getState().auth.accessToken;

  public async getById(id: number) {
    return await this.apiResolver.request<
      null,
      CommonResponseDto<UserResponseDto | string>
    >(
      id.toString(),
      "GET",
      null,
      this.token ? this.token : "",
    );
  }
}