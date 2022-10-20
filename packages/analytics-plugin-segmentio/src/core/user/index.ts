export type ID = string | null | undefined

export interface User {
  id(): ID,
  anonymousId(id?: ID): ID
}
