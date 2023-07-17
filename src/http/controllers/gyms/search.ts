import { MakeSearchGymsUsecase } from "@/use-case/factories/make-search-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymParams = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { page, query } = searchGymParams.parse(request.query)

  try {

    const searchGym = MakeSearchGymsUsecase()

    const { gyms } = await searchGym.execute({
      query,
      page,
    })

    return reply.status(200).send(gyms)

  } catch (err) {
    throw err
  }
}