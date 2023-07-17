import { verifyJWT } from "@/hooks/verify-jwt";
import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { register } from "./register";
import { metrics } from "./metrics";

export async function userRoutes(app: FastifyInstance) {

  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.get('/me/metrics', { onRequest: [verifyJWT] }, metrics)
}