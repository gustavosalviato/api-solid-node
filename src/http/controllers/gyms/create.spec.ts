
import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create gym', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const gymResponse = await request(app.server).post('/gyms').send({
      title: 'TypeScript Gym',
      description: "TypeScript Gym description",
      phone: "998704280",
      latitude: 2,
      longitude: 3
    }).set('Authorization', `Bearer ${token}`)

    expect(gymResponse.statusCode).toEqual(201)

  })
})
