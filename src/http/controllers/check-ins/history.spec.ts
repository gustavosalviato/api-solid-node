
import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-ins history', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list use check-ins history', async () => {

    const { token } = await createAndAuthenticateUser(app)


    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })


    const checkInsHistoryResponse = await request(app.server).get(`/check-ins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(checkInsHistoryResponse.statusCode).toEqual(200)
    console.log(checkInsHistoryResponse.body.checkIns)
  })
})
