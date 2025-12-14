import ApiResolverUtil from "@/utils/ApiResolverUtil.ts";
import type { CommonResponseDto } from "@/api/dto/common/common-response.dto.ts";
import type { LoginRequestDto } from "@/api/dto/auth/login-request.dto.ts";
import type { LoginResponseDto } from "@/api/dto/auth/login-response.dto.ts";
import type { ValidationErrorResponseDto } from "@/api/dto/common/validation-error-response.dto.ts";
import type { RegisterRequestDto } from "@/api/dto/auth/register-request.dto.ts";

export class AuthResolver {
  private apiResolver = new ApiResolverUtil("auth");

  public async login(data: LoginRequestDto) {
    return await this.apiResolver.request<
      LoginRequestDto,
      CommonResponseDto<LoginResponseDto | ValidationErrorResponseDto[] | string>
    >(
      "login",
      "POST",
      data,
    );
  }
  
  public async register(data: RegisterRequestDto) {
    return await this.apiResolver.request<
      RegisterRequestDto,
      CommonResponseDto<LoginResponseDto | ValidationErrorResponseDto[] | string>
    >(
      "register",
      "POST",
      data
    );
  }
}