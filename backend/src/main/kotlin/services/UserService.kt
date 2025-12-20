package services

import dto.user.UserResponseDTO
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
        val user = userRepository.findById(id)
            ?: throw UserNotFoundException("id $id")
        return user.toDto()
    }

    fun UserEntity.toDto(): UserResponseDTO {
        val (id, email, name, surname, patronymic, studyGroup) = this
        return UserResponseDTO(id!!, email, name, surname, patronymic, studyGroup)
    }
}