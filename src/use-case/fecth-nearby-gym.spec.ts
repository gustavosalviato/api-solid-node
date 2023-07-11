import { beforeEach, describe, expect, it, } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbysUseCase } from "./fetch-nearby-gyms";


let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbysUseCase;

describe("Fecth nearby gyms use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbysUseCase(gymsRepository);
  });

  it('should be able to fecth nearby gym', async () => {

    await gymsRepository.create({
      latitude: -23.7282265,
      longitude: -52.8634204,
      title: 'Near gym',
      description: null,
      id: 'gym-01',
    })


    await gymsRepository.create({
      latitude: -23.7702068,
      longitude: -53.2980804,
      title: 'Far gym',
      description: null,
      id: 'gym-02',
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.7282265,
      userLongitude: -52.8634204,
    })

    expect(gyms).toHaveLength(1)
    expect.objectContaining({
      title: 'Far gym',
    })
  })
});
