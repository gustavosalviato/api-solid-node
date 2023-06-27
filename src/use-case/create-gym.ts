import { GymsRepository } from "@/repositories/prisma/gyms-repository";
import { Gym } from "@prisma/client";

interface CreateGymRequest {
  title: string
  description: string | null
  phone: string | null,
  latitude: number
  longitude: number
}

interface CreateGymResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title
  }: CreateGymRequest): Promise<CreateGymResponse> {
    const gym = await this.gymsRepository.create({
      latitude,
      longitude,
      title,
      description,
      phone,
    })

    return {
      gym
    }

  }
}
