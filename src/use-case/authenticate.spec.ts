import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credential-error";

describe("Authenticate use case", () => {
  it("should be able to authenticate user", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRespository);

    await usersRespository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate user with wrong email", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRespository);

    await expect(() =>
      sut.execute({
        email: "example@gmail.com",
        password: "777",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate user with wrong password", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRespository);

    await usersRespository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "example@gmail.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
