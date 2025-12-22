import ApiResolverUtil from "@/utils/ApiResolverUtil.ts";
import type { CommonResponseDto } from "@/api/dto/common/common-response.dto.ts";
import type { UserResponseDto } from "@/api/dto/users/user-response.dto.ts";

export class UsersResolver {
  private apiResolver = new ApiResolverUtil("users");

  public async getById(id: number) {
    return await this.apiResolver.request<
      null,
      CommonResponseDto<UserResponseDto | string>
    >(
      id.toString(),
      "GET",
      null,
    );
  }
}