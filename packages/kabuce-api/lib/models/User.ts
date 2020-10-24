export interface UserConfiguration {
  configuration: any
  integration: string
}

export interface User {
  domain: string
  email: string
  configurations: UserConfiguration[]
}
