import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FethUseCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";

export function MakeFecthUseCheckInHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRepository();
  const useCase = new FethUseCheckInsHistoryUseCase(checkInRepository);

  return useCase
}