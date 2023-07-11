import { beforeEach, describe, expect, it, } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";


let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search gyms use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search gyms', async () => {

    await gymsRepository.create({
      latitude: 0,
      longitude: 0,
      title: 'Gym 01',
      description: null,
      id: 'gym-01',
    })

    await gymsRepository.create({
      latitude: 0,
      longitude: 0,
      title: 'Gym 02',
      description: null,
      id: 'gym-02',
    })


    const { gyms } = await sut.execute({
      query: 'Gym 01',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect.objectContaining({
      title: 'Gym 01',
    })

  })

  it('should be able to paginated searched gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        latitude: 0,
        longitude: 0,
        title: `Gym ${i}`,
        description: null,
        id: `gym-0${i}`,
      })

    }

    const { gyms } = await sut.execute({
      page: 2,
      query: 'Gym'
    })

    expect(gyms).toHaveLength(2)
  })

});
