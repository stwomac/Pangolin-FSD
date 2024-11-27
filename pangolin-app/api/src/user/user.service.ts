import {
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from 'src/auth/auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.repo.find()
  }

  async getById(userId: number): Promise<User> {
    const user = await this.repo.findOne({
      where: { userId },
      relations: { reports: true },
    })
    if (user == null)
      throw new HttpException(
        `No user with id ${userId} exist.`,
        HttpStatus.NOT_FOUND,
      )
    return user
  }

  async getByEmail(email: string): Promise<User> {
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

  async create(createUserDto: CreateUserDto): Promise<User> {
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

    let toCreate: User = new User()
    toCreate.email = createUserDto.email
    toCreate.role = 'user'

    toCreate.passHash = await this.authService.hashPassword(
      createUserDto.password,
    )

    return await this.repo.save(toCreate)
  }

  async update(userId: number, updatedData: UpdateUserDto) {
    const user = await this.getById(userId)
    const updatedUser = this.repo.merge(user, updatedData)
    return await this.repo.save(updatedUser)
  }

  async delete(user: User): Promise<User> {
    return await this.repo.remove(user)
  }
}
