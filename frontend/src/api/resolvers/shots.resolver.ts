import ApiResolverUtil from "@/utils/ApiResolverUtil.ts";
import type { CommonResponseDto } from "@/api/dto/common/common-response.dto.ts";
import type { ShotResponseDto } from "@/api/dto/shots/shot-response.dto.ts";
import type { ShotRequestDto } from "@/api/dto/shots/shot-request.dto.ts";

export class ShotsResolver {
  private apiResolver = new ApiResolverUtil("shots");

  public async getAll() {
    return await this.apiResolver.request<
      null,
      CommonResponseDto<ShotResponseDto[] | string>
    >(
      "",
      "GET",
      null,
    );
  }

  public async create(data: ShotRequestDto) {
    return await this.apiResolver.request<
      ShotRequestDto,
      CommonResponseDto<ShotResponseDto | string>
    >(
      "",
      "POST",
      data,
    );
  }
}