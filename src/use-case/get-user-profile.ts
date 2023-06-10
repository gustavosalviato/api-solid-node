import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/prisma/users-repository";

interface GetUseProfileRequest {
  userId: string
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ userId }: GetUseProfileRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }
  }
}