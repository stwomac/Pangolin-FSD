import { Serializable, Deserializable, OptionalId } from './utils/serializable'

export interface UserLike {
  userId?: number
  email: string
  role: string
}

@Deserializable<User, UserLike, 'userId'>()
export class User
  extends Serializable<UserLike, 'userId'>
  implements OptionalId<UserLike, 'userId'>
{
  public email: string
  public role: string
  public readonly userId?: number

  constructor(data: OptionalId<UserLike, 'userId'>) {
    super('userId')
    this.userId = data.userId
    this.email = data.email
    this.role = data.role
  }

  public override toJson() {
    const { idPropKey: _, ...userLike } = this
    return userLike
  }

  public static parse(data: UserLike): User {
    return new User(data)
  }
}
