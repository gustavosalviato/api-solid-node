
import request from 'supertest'
import { app } from '@/app'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('User metrics', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get user metrics', async () => {

    await request(app.server).post('/users').send({
      name: 'johndoe',
      email: 'johndoe@gmail.com',
      password: '123455',
    })


    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: '123455',
    })

    const token = response.body.token


    const userMetricsResponse = await request(app.server).get('/me/metrics')
      .set('Authorization', `Bearer ${token}`)


    expect(userMetricsResponse.body).toEqual(expect.objectContaining({
      checkInsCount: expect.any(Number)
    }))
    expect(userMetricsResponse.statusCode).toEqual(200)

  })
})
