import { DynamoDB } from 'aws-sdk'
import { APIGatewayEvent } from 'aws-lambda'

import { Domain } from './models/Domain'

export async function list() {
  const client = new DynamoDB()
  const results = await client.query({ TableName: 'kabuce_domains' }).promise()

  if (results.Items) {
    return results.Items
  }

  return []
}

export async function register(event: APIGatewayEvent) {
  if (event.body === undefined) {
    return { statusCode: 400, body: 'Must provide a domain request object' }
  }

  const client = new DynamoDB()

  const body: Domain = JSON.parse(event.body)

  const input: DynamoDB.GetItemInput = {
    Key: {},
    TableName: 'kabuce_domains',
  }

  const results = await client.getItem(input).promise()

  if (results.Item) {
    return { statusCode: 200, body: JSON.stringify(results.Item) }
  }

  return { statusCode: 404 }
}
