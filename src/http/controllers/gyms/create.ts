import { MakeCreateGymUseCase } from "@/use-case/factories/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    description: z.string().nullable(),
    phone: z.string().nullable(),
    title: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })

  const { description, latitude, longitude, phone, title } = createGymBodySchema.parse(request.body)

  try {

    const creategym = MakeCreateGymUseCase()

    const { gym } = await creategym.execute({
      description,
      latitude,
      longitude,
      phone,
      title
    })

    return reply.status(201).send(gym)

  } catch (err) {
    throw err
  }
}