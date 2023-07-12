import { FastifyInstance } from "fastify";
import { register } from "./controllers/register.controller";
import { authenticate } from "./controllers/authenticate.controller";
import { profile } from "./controllers/profile.controller";
import { verifyJWT } from "@/hooks/verify-jwt";

export async function AppRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.get('/me', { onRequest: [verifyJWT] }, profile)

}
