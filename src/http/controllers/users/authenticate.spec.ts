
import request from 'supertest'
import { app } from '@/app'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Authenticate', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {

    await request(app.server).post('/users').send({
      name: 'johndoe',
      email: 'johndoe@gmail.com',
      password: '123455',
    })


    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: '123455',
    })


    expect(response.body).toEqual(expect.objectContaining({
      token: expect.any(String)
    }))
    expect(response.statusCode).toEqual(200)
  })
})
