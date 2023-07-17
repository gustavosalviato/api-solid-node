import { z } from 'zod'
import { FastifyRequest, FastifyReply } from "fastify";

import { MakeFecthUseCheckInHistoryUseCase } from '@/use-case/factories/make-fetch-user-check-in-history-use-case';
export async function history(request: FastifyRequest, reply: FastifyReply) {

  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  try {

    const userCheckInsHistory = MakeFecthUseCheckInHistoryUseCase()

    const { checkIns } = await userCheckInsHistory.execute({
      page,
      userId: request.user.sub
    });

    return reply.status(200).send({
      checkIns
    })
  } catch (err) {

    throw err
  }


}
