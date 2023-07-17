import { verifyJWT } from "@/hooks/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)


  app.get('/check-ins/history', history)
  app.post('/gyms/:gymId/check-ins', create)
  app.put('/checks-ins/:checkInId/validate', validate)
}
