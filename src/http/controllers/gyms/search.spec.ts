
import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search gym', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list searched gyms', async () => {

    const { token } = await createAndAuthenticateUser(app)

    await request(app.server).post('/gyms').send({
      title: 'TypeScript Gym',
      description: "TypeScript Gym description",
      phone: "998704280",
      latitude: 0,
      longitude: 0
    }).set('Authorization', `Bearer ${token}`)

    await request(app.server).post('/gyms').send({
      title: 'JavaScript Gym',
      description: "JavaScript Gym description",
      phone: "998704280",
      latitude: 0,
      longitude: 0
    }).set('Authorization', `Bearer ${token}`)


    const seachGymsResponse = await request(app.server).get(`/gyms/search`).query({
      query: 'JavaScript'
    })
      .set('Authorization', `Bearer ${token}`)


    expect(seachGymsResponse.statusCode).toEqual(200)
    expect(seachGymsResponse.body).toHaveLength(1)
    expect(seachGymsResponse.body).toEqual(expect.objectContaining([
      expect.objectContaining({
        title: 'JavaScript Gym'
      })
    ]))

  })
})
