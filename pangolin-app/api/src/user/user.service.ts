import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user'
import { Repository } from 'typeorm'
import { AuthService } from 'src/auth/auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
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

  async create({ email, password, ...userData }: CreateUserDto): Promise<User> {
    if (await this.repo.exists({ where: { email } }))
      throw new HttpException(
        `User with email ${email} already exists!`,
        HttpStatus.BAD_REQUEST,
      )

    const user = this.repo.create({ email, reports: [], ...userData })

    user.role = 'user'
    user.passHash = await this.authService.hashPassword(password)
    console.log(`saving user ${user}`)
    return await this.repo.save(user)
  }

  async update({ userId, ...userData }: UpdateUserDto) {
    const user = await this.getById(userId)
    const updatedUser = this.repo.merge(user, userData)
    return await this.repo.save(updatedUser)
  }

  async delete(user: User): Promise<void> {
    await this.repo.remove(user)
  }
}
