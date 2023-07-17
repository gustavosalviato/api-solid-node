import { FastifyRequest, FastifyReply } from "fastify";
import { MakeGetUserMetricsUseCase } from "@/use-case/factories/make-get-user-metrics-use-case";
export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  try {

    const userMetrics = MakeGetUserMetricsUseCase()

    const { checkInsCount } = await userMetrics.execute({
      userId: request.user.sub
    });

    return reply.status(200).send({
      checkInsCount
    });
  } catch (err) {

    throw err
  }


}
