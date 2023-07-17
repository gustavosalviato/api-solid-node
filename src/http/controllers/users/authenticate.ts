import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialsError } from "@/errors/invalid-credential-error";
import { MakeAuthenticateUseCase } from "@/use-case/factories/make-authenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = MakeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password });


    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    })

    return reply.status(200).send({
      token
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
