import { expect, test } from '@playwright/test'
import { LoginDto } from '../dto/login-dto'
import { StatusCodes } from 'http-status-codes'

const authUrl = 'https://backend.tallinn-learning.ee/login/student'

test('login for students with incorrect username and password receive 401', async ({ request }) => {
  const loginData = new LoginDto('string11', 'string11')
  const response = await request.post(authUrl, {
    data: loginData,
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})
test('login for students with correct username and password receive 401', async ({ request }) => {
  // const loginData = LoginDto.createLoginWithCorrectData()
  const loginData = new LoginDto('testautomvl', 'whs4s5qbYbfT2n')
  const response = await request.post(authUrl, {
    data: loginData,
  })
  const responseBody = await response.text()
  console.log('Response body :' + responseBody)
  expect(response.status()).toBe(StatusCodes.OK)
  expect(responseBody).toBeDefined()
})
