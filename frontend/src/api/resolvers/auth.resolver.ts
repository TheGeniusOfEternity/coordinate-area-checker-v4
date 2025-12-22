import ApiResolverUtil from "@/utils/ApiResolverUtil.ts";
import type { CommonResponseDto } from "@/api/dto/common/common-response.dto.ts";
import type { LoginRequestDto } from "@/api/dto/auth/login-request.dto.ts";
import type { AuthResponseDto } from "@/api/dto/auth/auth-response.dto.ts";
import type { ValidationErrorResponseDto } from "@/api/dto/common/validation-error-response.dto.ts";
import type { RegisterRequestDto } from "@/api/dto/auth/register-request.dto.ts";

export class AuthResolver {
  private apiResolver = new ApiResolverUtil("auth");

  public async login(data: LoginRequestDto) {
    return await this.apiResolver.request<
      LoginRequestDto,
      CommonResponseDto<AuthResponseDto | ValidationErrorResponseDto[] | string>
    >(
      "login",
      "POST",
      data,
    );
  }
  
  public async register(data: RegisterRequestDto) {
    return await this.apiResolver.request<
      RegisterRequestDto,
      CommonResponseDto<AuthResponseDto | ValidationErrorResponseDto[] | string>
    >(
      "register",
      "POST",
      data
    );
  }

  public async refreshJWT() {
    return await this.apiResolver.request<
      null,
      CommonResponseDto<AuthResponseDto>
    >(
      "refresh-jwt",
      "POST",
      null,
    );
  }
}