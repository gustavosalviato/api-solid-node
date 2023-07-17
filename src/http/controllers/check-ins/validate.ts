import { z } from 'zod'
import { FastifyRequest, FastifyReply } from "fastify";
import { MakeValidateCheckInUsecase } from '@/use-case/factories/make-validate-check-in-use-case';
import { LateCheckInValidationError } from '@/errors/late-check-in-validation-error';
export async function validate(request: FastifyRequest, reply: FastifyReply) {

  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  try {

    const validateCheckInUseCase = MakeValidateCheckInUsecase()

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId
    });

    return reply.status(204).send({
      checkIn
    })
  } catch (err) {
    if (err instanceof LateCheckInValidationError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err
  }


}
