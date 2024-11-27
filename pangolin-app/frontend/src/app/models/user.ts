import { Serializable } from './utils/serializable'

export interface UserLike {
  userId: number
  email: string
  role: string
}

export class User
  extends Serializable<UserLike>
  implements Omit<UserLike, 'userId'>
{
  public email: string
  public role: string

  constructor(data: UserLike) {
    super(data.userId)
    this.email = data.email
    this.role = data.role
  }

  public override toJson(): UserLike {
    const { id, ...userLike } = this
    return { ...userLike, userId: id }
  }
}
