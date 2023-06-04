import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  email,
  name,
  password,
}: RegisterUserRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('Email already exists.')
  }

  const password_hash = await hash(password, 6);

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash,
    },
  });
}
