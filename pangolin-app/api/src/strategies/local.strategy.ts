import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({ usernameField: 'email', passwordField: 'pass_hash' })
  }

  async validate(email: string, pass_hash: string) {
    const user = await this.userService.getByEmail(email)
    try {
      const token = await this.userService.validateUser(user)
      return token
    } catch (EntityNotFoundError) {
      throw new UnauthorizedException()
    }
  }
}
