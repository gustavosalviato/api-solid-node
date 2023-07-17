import { MakeFetchNearbyGymUseCase } from "@/use-case/factories/make-fetch-nearby-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const searchNearbyGymBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = searchNearbyGymBodySchema.parse(request.query)


  const fetchNeabyGym = MakeFetchNearbyGymUseCase()

  const { gyms } = await fetchNeabyGym.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms
  })


}