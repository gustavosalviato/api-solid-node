import { GymsRepository } from "@/repositories/prisma/gyms-repository";

interface SearchGymRequest {
  query: string
  page: number
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({ query, page }: SearchGymRequest) {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms
    }
  }
}