import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";


let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get a user profile", async () => {
    const createdUser = await usersRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John doe',
      password_hash: await hash('123456', 6)
    })


    const { user } = await sut.execute({
      userId: createdUser.id
    });

    expect(user.name).toEqual('John doe');
  });

  it('should not be able to get an user with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-exists-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
});
