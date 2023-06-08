import { InvalidCredentialsError } from "@/errors/invalid-credential-error";
import { UsersRepository } from "@/repositories/prisma/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AutheticateUseCaseRequest {
  email: string,
  password: string
}

interface AutheticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository){}


  async execute ({email , password} :AutheticateUseCaseRequest) : Promise<AutheticateUseCaseResponse>{
    
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = compare(password, user.password_hash)

    if (!doesPasswordMatches){
      throw new InvalidCredentialsError()
    }

    return {
      user
    }
  }
}
