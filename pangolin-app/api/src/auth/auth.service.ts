import {
  forwardRef,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common'
import { UsersService } from 'src/user/user.service'
import { Users } from 'src/user/user'
import { AuthValues } from './config'
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ValidateUserDto } from 'src/user/dto/validate-user.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  /*
   * takes a password and returns the hashed version of that password for safe storage
   * */
  async hashPassword(password: string): Promise<string> {
    //crypto-fy that password!
    return await hash(password + AuthValues.PEPPER, 10)
  }

  /*
   * takes a username and password and determines if the credentials are valid
   * then returns an access token if valid
   * */
  async validateLogin(
    validateUserDto: ValidateUserDto,
  ): Promise<{ access_token: string }> {
    let userToAuth: Users = await this.userService.getByEmail(
      validateUserDto.username,
    )

    let peppered_password: string = validateUserDto.password + AuthValues.PEPPER
    let authentication: boolean = await compare(
      peppered_password,
      userToAuth.passHash,
    )

    if (!authentication) throw new UnauthorizedException()

    const payload = { sub: userToAuth.userId, username: userToAuth.email }

    let access_token = {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWTSECRET,
      }),
    }

    return access_token
  }
}
