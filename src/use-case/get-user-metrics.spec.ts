import { beforeEach, describe, expect,  it, } from "vitest";
import { InMemoryCheckInsRespository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRespository: InMemoryCheckInsRespository;
let sut : GetUserMetricsUseCase
describe("Get user check-ins count", () => {
  beforeEach(() => {
    checkInsRespository = new InMemoryCheckInsRespository();
    sut = new GetUserMetricsUseCase(checkInsRespository)
  });

  it('should be able to get user check-ins count', async () => {

    await checkInsRespository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInsRespository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })
    
    
    expect(checkInsCount).toEqual(2)
  })
});
