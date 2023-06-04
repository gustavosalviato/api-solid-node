import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { registerUseCase } from "@/use-case/register";
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  try {
    await registerUseCase({ email, name, password });
  } catch (err) {
    return reply.status(409).send();
  }

  return reply.status(201).send;
}
