import {
  Inject,
  forwardRef,
  ForwardReference,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from './users'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from './dto/create-user-dto'
import { AuthService } from 'src/auth/auth.service'
import { AuthValues } from 'src/auth/config'
import { compare } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private repo: Repository<Users>,
    private jwtService: JwtService,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async getAll(): Promise<Users[]> {
    return await this.repo.find()
  }

  async getById(userId: number): Promise<Users> {
    const user = await this.repo.findOne({
      where: { userId },
      relations: { reports: true },
    })
    return user;
  }


  async getByEmail(email: string): Promise<Users> {
    const user = await this.repo.findOne({
      where: { email },
      relations: { reports: true },
    })
    if (user == null)
      throw new HttpException(
        `No user with email ${email} exist.`,
        HttpStatus.NOT_FOUND,
      )
    return user
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {

    let exists = await this.repo.exists({
      where: {
        email: createUserDto.email,
      },
    })

    if (exists) {
      throw new HttpException(
        `User with email ${createUserDto.email} already exists!`,
        HttpStatus.BAD_REQUEST,
      )
    }

    let toCreate: Users = new Users()
    toCreate.email = createUserDto.email
    toCreate.role = 'user'

    toCreate.passHash = await this.authService.hashPassword(
      createUserDto.password,
    )


    return await this.repo.save(toCreate)
  }

  async update(user: Users, updatedData: Users) {
    const updatedUser = this.repo.merge(user, updatedData)
    return await this.repo.save(updatedUser)
  }

  async delete(user: Users): Promise<Users> {
    return await this.repo.remove(user)
  }
}
