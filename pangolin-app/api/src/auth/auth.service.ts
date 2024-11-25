import {
  forwardRef,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { Users } from 'src/users/users'
import { AuthValues } from './config'
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ValidateUserDto } from 'src/users/dto/validate-user.dto'

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
    console.log(validateUserDto)

    let userToAuth: Users = await this.userService.getUserByEmail(
      validateUserDto.username,
    )

    console.log(userToAuth)

    let peppered_password: string = validateUserDto.password + AuthValues.PEPPER
    let authentication: boolean = await compare(
      peppered_password,
      userToAuth.pass_hash,
    )

    if (!authentication) throw new UnauthorizedException()

    const payload = { sub: userToAuth.user_id, username: userToAuth.email }

    let access_token = {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWTSECRET,
      }),
    }

    return access_token
  }
}
