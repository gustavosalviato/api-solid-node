import { fastify } from 'fastify'
import { AppRoutes } from './http/routes'

export const app = fastify()

app.register(AppRoutes)
