import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";


let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create a new gym', async () => {
    const { gym } = await sut.execute({
      description: '',
      latitude: 0,
      longitude: 0,
      phone: '',
      title: 'test gym'
    })

    expect(gym.id).toEqual(expect.any(String))
  })
});
