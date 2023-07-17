
import request from 'supertest'
import { app } from '@/app'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Register', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'johndoe',
      email: 'johndoe@gmail.com',
      password: '123455',
    })

    expect(response.statusCode).toEqual(201)
  })
})
