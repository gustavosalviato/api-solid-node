import { beforeEach, describe, expect, it, } from "vitest";
import { InMemoryCheckInsRespository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FethUseCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";



let checkInsRespository: InMemoryCheckInsRespository;
let sut: FethUseCheckInsHistoryUseCase;

describe("Check In use case", () => {
  beforeEach(() => {
    checkInsRespository = new InMemoryCheckInsRespository();
    sut = new FethUseCheckInsHistoryUseCase(checkInsRespository);
  });

  it('should be able to fecth check-in history', async () => {

    await checkInsRespository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInsRespository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1
    })
    
    expect(checkIns).toHaveLength(2)
    expect.objectContaining({
      gym_id: 'gym-01',
    })
    expect.objectContaining({
      gym_id: 'gym-02',
    })
  })

  it('should be able to paginated check ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRespository.create({
        gym_id: `gym-0${1}`,
        user_id: 'user-01'
      })
    }

    const { checkIns } = await sut.execute({
      page: 2,
      userId: 'user-01'
    })

    expect(checkIns).toHaveLength(2)
  })

});
