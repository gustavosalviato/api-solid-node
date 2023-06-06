import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { UsersRepository } from "@/repositories/prisma/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    email,
    name,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    });

    return {
      user,
    };
  }
}
