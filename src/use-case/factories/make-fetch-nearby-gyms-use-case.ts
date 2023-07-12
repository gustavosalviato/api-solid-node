import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbysUseCase } from "../fetch-nearby-gyms";

export function MakeFetchNearbyGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbysUseCase(gymsRepository);

  return useCase
}