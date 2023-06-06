import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";

describe("Register use case", () => {
  it('should be able to register', async () => {
    const usersRespository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRespository);

    const { user } = await registerUseCase.execute({
      email: "johndoe@example.com",
      name: "John Doe",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String))
  })

  it("should hash user password upon registration", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRespository);

    const { user } = await registerUseCase.execute({
      email: "johndoe@example.com",
      name: "John Doe",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register a user with the same email", async () => {
    const usersRespository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRespository);

    const email = "johndoe@example.com";

    await registerUseCase.execute({
      email,
      name: "John Doe",
      password: "123456",
    });

    expect(() =>
      registerUseCase.execute({
        email,
        name: "John Doe",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    });
});
