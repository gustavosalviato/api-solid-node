import { beforeEach, describe, expect, it, afterEach, vi } from "vitest";
import { InMemoryCheckInsRespository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { ValidateCheckInUseCase } from "./validate-check-in";
import { LateCheckInValidationError } from "@/errors/late-check-in-validation-error";


let checkInsRespository: InMemoryCheckInsRespository;
let sut: ValidateCheckInUseCase;

describe("Check In use case", () => {
  beforeEach(() => {
    checkInsRespository = new InMemoryCheckInsRespository();
    sut = new ValidateCheckInUseCase(checkInsRespository);



    vi.useFakeTimers()
  });

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to validate check-in", async () => {
    const createdCheckIn = await checkInsRespository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })
    const { checkIn } = await sut.execute({
      gymId: createdCheckIn.id
    })


    expect(checkIn.validated_at).toEqual(expect.any(Date))
  });

  it('should be able to validate the check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 40))

    const createdCheckIn = await checkInsRespository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)


    await expect(() =>
      sut.execute({
        gymId: createdCheckIn.id
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError)

  })
});
