import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { UsersRepository } from "@/repositories/prisma/users-repository";
import { hash } from "bcryptjs";

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email, name, password }: RegisterUserRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    });
  }
}
