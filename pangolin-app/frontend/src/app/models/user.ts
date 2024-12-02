import { Deserializable } from './utils/serializable'

export interface ApiUserModel {
  userId: number
  email: string
  role: string
}

export interface UserLike extends Omit<ApiUserModel, 'userId'> {
  userId?: number
}

@Deserializable<User, UserLike, ApiUserModel>()
export class User implements UserLike {
  public readonly userId?: number
  public email: string
  public role: string

  constructor(data: UserLike | ApiUserModel) {
    this.userId = data.userId
    this.email = data.email
    this.role = data.role
  }
}
