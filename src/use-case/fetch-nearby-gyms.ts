import { GymsRepository } from "@/repositories/prisma/gyms-repository";

interface FetchNearbyRequest {
  userLatitude: number
  userLongitude: number
}

export class FetchNearbysUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({ userLatitude, userLongitude }: FetchNearbyRequest) {
    const gyms = await this.gymsRepository.fecthManyNearby({
      latitude: userLatitude, longitude: userLongitude
    })

    return {
      gyms
    }
  }
}
