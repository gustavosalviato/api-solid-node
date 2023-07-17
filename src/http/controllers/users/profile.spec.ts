
import request from 'supertest'
import { app } from '@/app'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Profile', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get user profile', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server).get('/me')
      .set('Authorization', `Bearer ${token}`)


    expect(profileResponse.body).toEqual(expect.objectContaining({
      name: 'johndoe',
      email: 'johndoe@gmail.com',
    }))
    expect(profileResponse.statusCode).toEqual(200)

  })
})
