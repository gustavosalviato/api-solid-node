import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'johndoe',
    email: 'johndoe@gmail.com',
    password: '123455',
  })


  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@gmail.com',
    password: '123455',
  })

  const { token } = authResponse.body

  return {
    token
  }

}