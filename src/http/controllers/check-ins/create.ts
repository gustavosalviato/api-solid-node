import { z } from 'zod'
import { FastifyRequest, FastifyReply } from "fastify";
import { MakeCheckInUseCase } from "@/use-case/factories/make-check-in-use-case-";
export async function create(request: FastifyRequest, reply: FastifyReply) {

  const checkInParamsSchema = z.object({
    gymId: z.string()
  })

  const checkInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = checkInBodySchema.parse(request.body)

  const { gymId } = checkInParamsSchema.parse(request.params)

  const checkInUseCase = MakeCheckInUseCase()

  const { checkIn } = await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLogitude: longitude
  });

  return reply.status(201).send({ checkIn })

}
