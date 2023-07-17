
import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create check-in', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {

    const { token } = await createAndAuthenticateUser(app)


    const gym = await prisma.gym.create({
      data: {
        latitude: -23.7282265,
        longitude: -52.8634204,
        title: 'Gym 01'
      }
    })

    const gymResponse = await request(app.server).post(`/gyms/${gym.id}/check-ins`)
      .send({
        latitude: -23.7282265,
        longitude: -52.8634204,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(gymResponse.statusCode).toEqual(201)

  })
})
