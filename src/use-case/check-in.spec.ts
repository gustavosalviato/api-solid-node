import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { InMemoryCheckInsRespository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime";
import { MaxDistantError } from "@/errors/max-distant-error";
import { MaxNumberOfCheckInError } from "@/errors/max-number-of-check-ins.error";


let checkInsRespository: InMemoryCheckInsRespository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check In use case", () => {
  beforeEach(() => {
    checkInsRespository = new InMemoryCheckInsRespository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRespository, gymsRepository);

    gymsRepository.gyms.push({
      description: '',
      id: 'gym-id-1',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '',
      title: ''
    })

    vi.useFakeTimers()
  });

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: 0,
      userLogitude: 0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  });

  it("should not be able to check in twice on same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: 0,
      userLogitude: 0

    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id-1',
        userId: 'user-id-1',
        userLatitude: 0,
        userLogitude: 0
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInError)

  });


  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: 0,
      userLogitude: 0
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))


    const { checkIn } = await sut.execute({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
      userLatitude: 0,
      userLogitude: 0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.gyms.push({
      description: '',
      id: 'gym-id-02',
      latitude: new Decimal(-23.7352601),
      longitude: new Decimal(-52.8656589),
      phone: '',
      title: ''
    })

    await expect(() => 
    sut.execute({
      gymId: 'gym-id-02',
      userId: 'user-id-01',
      userLatitude: -23.72885,
      userLogitude: -52.8456449
    })
    ).rejects.toBeInstanceOf(MaxDistantError)
  })

});
