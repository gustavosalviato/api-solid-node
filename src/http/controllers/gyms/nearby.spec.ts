
import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search nearby gym', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list  nearby gyms', async () => {

    const { token } = await createAndAuthenticateUser(app)

    await request(app.server).post('/gyms').send({
      title: 'TypeScript Gym',
      description: "TypeScript Gym description",
      phone: "998704280",
      latitude: -23.7282265,
      longitude: -52.8634204,
    }).set('Authorization', `Bearer ${token}`)

    await request(app.server).post('/gyms').send({
      title: 'JavaScript Gym',
      description: "JavaScript Gym description",
      latitude: -23.7702068,
      longitude: -53.2980804,
    }).set('Authorization', `Bearer ${token}`)


    const nearbyGymsResponse = await request(app.server).get(`/gyms/nearby`).query({
      latitude: -23.7282265,
      longitude: -52.8634204,
    })
      .set('Authorization', `Bearer ${token}`).send()


    expect(nearbyGymsResponse.statusCode).toEqual(200)
    expect(nearbyGymsResponse.body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym',
      })
    ])

  })
})
