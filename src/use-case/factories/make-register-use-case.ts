import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";

export function MakeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUserCase = new RegisterUseCase(prismaUsersRepository);

  return registerUserCase
}