import { User } from '../user'

export interface Analytics {
  user(): User
  settings: {
    app: {
      service: string
      version: string
      profile: string
    }
  }
}
