import { APIGatewayEvent } from 'aws-lambda'
import { register } from './lib/domains'

export const domains_register = register
