import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOndate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(id: string, page: number) : Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
}
