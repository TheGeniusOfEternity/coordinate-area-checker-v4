package services

import dto.auth.LoginRequestDTO
import dto.auth.LoginResponseDTO
import dto.common.CommonResponseDTO
import jakarta.enterprise.context.ApplicationScoped
import jakarta.validation.Valid

@ApplicationScoped
class AuthService {
    fun login(@Valid requestDTO: LoginRequestDTO): CommonResponseDTO<LoginResponseDTO> {
        return CommonResponseDTO(
            200,
            LoginResponseDTO("success! creds are:\n ${requestDTO.email} | ${requestDTO.password}")
        )
    }
}