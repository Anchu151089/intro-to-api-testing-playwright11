import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(200)
})
test('request with invalid id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/11')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(400)
})
test('post order with correct data should receive code 201', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})
test('post order with invalid payload should receive code 400', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'BLOCKED',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
test('case1 put request with valid order id return code 200 ', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'Anchu',
    customerPhone: 'Anchu_PhoneNo',
    comment: 'Hello',
    id: 0,
  }
  const requestHeaders = {
    api_key: '1234567898765432',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})
test(' case 2 put request with invalid id return code 400 ', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'Anchu',
    customerPhone: 'Anchu_PhoneNo',
    comment: 'Hello',
    id: 0,
  }
  const requestHeaders = {
    api_key: '1234567898765432',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/11', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
test(' case 3 get request with username and password return 200 ', async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username=anchu&password=1234',
    {},
  )
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})
test(' case 4 get request without username and password return 500  ', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {})
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
test(' case 5 delete order with valid order id receive 204  ', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567898765432',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})
test(' case 6 delete order with invalid order id receive 400 bad request  ', async ({
  request,
}) => {
  const requestHeaders = {
    api_key: '1234567898765432',
  }

  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/11', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
