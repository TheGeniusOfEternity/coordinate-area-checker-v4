package services

import dto.users.UserResponseDTO
import entities.UserEntity
import exceptions.UserNotFoundException
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import repositories.UserRepository

@ApplicationScoped
class UserService {
    @Inject
    private lateinit var userRepository: UserRepository

    fun getById(id: Long): UserResponseDTO {
        val user = userRepository.getById(id)
            ?: throw UserNotFoundException("id $id")
        return user.toDto()
    }

    fun UserEntity.toDto(): UserResponseDTO =
        UserResponseDTO(id!!, email, name, surname, patronymic, studyGroup)
}