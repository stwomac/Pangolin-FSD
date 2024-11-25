import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from './users'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private repo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async getAll(): Promise<Users[]> {
    return await this.repo.find()
  }

  async getById(userId: number): Promise<Users> {
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

  async create(newUser: Users): Promise<Users> {
    const user = this.repo.create(newUser)
    return await this.repo.save(user)
  }

  async update(user: Users, updatedData: Users) {
    const updatedUser = this.repo.merge(user, updatedData)
    return await this.repo.save(updatedUser)
  }

  async delete(user: Users): Promise<Users> {
    return await this.repo.remove(user)
  }

  async validateUser(userToLogin: Users): Promise<{ access_token: string }> {
    try {
      const user = await this.repo.findOneOrFail({
        where: { userId: userToLogin.userId },
      })
      if (userToLogin.passHash === user.passHash) {
        const payload = { sub: user.userId, email: user.email }
        const token = await this.jwtService.signAsync(payload) // JWT generation
        return { access_token: token } // Explicitly return the token
      }
    } catch (error) {
      throw new HttpException(`Invalid!`, HttpStatus.BAD_REQUEST)
    }
  }
}
