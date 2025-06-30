import { expect, test } from '@playwright/test'
import { LoginDto } from './dto/login-dto'
import { OrderDto } from './dto/order-dto'
import { StatusCodes } from 'http-status-codes'

const baseUrl = 'https://backend.tallinn-learning.ee/orders'
const Customer_Name = 'Anchu'
const Customer_Phone = "123456789"
const Comment = 'Hello World!'
const ID = 1
const loginUrl = 'https://backend.tallinn-learning.ee/login/student'

test('create a student order ', async ({ request }) => {

  const loginData = new LoginDto('testautomvl', 'whs4s5qbYbfT2n')
  //const loginData = LoginDto.createLoginWithCorrectData()
  const response = await request.post(loginUrl, {
    data: loginData,
  })
  const jwt = await response.text()
  console.log(jwt)
  const orderDto = new OrderDto('OPEN' , 1 , Customer_Name , Customer_Phone , Comment , ID)
  const apiOrderResponse = await request.post(baseUrl,  {
    data: orderDto,
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  console.log(apiOrderResponse.status())
  const orderJsonResponse = await apiOrderResponse.json()
  console.log(orderJsonResponse)
  expect(orderJsonResponse.id).toBeDefined()
  expect(orderJsonResponse.customerName).toBe(Customer_Name)
  expect(orderJsonResponse.customerPhone).toBe(Customer_Phone)

  //get the order
  const orderId = orderJsonResponse.id
  console.log('received order id is '+ orderId)

  //find the order by id
  const apiGetOrderResponse = await request.get(baseUrl +'/'+ orderId, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  console.log(apiGetOrderResponse.status())
  const apiGetOrderJson = await apiGetOrderResponse.json()
  console.log(apiGetOrderJson)

  // delete order by id
  const deleteOrder = await request.delete(`${baseUrl}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const deleteOrderResponse = await deleteOrder.json()
  console.log('Order Deleted:', deleteOrderResponse)
  expect(deleteOrder.status()).toBe(StatusCodes.OK)

})
