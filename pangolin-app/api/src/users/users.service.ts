import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from './users'
import { DeleteResult, EntityNotFoundError, Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private repo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<Users[]> {
    return await this.repo.find({
      //commenting this out until we have some reports in the database, it leads to errors.
      // relations: {
      //     reports: true
      // }
    })
  }

  async getUserById(idToFind: number): Promise<Users> {
    return await this.repo
      .findOneOrFail({
        where: {
          userId: idToFind,
        },
        // relations: {
        //     reports: true
        // }
      })
      .catch(() => {
        throw new HttpException(
          `User with Id ${idToFind} does not exist`,
          HttpStatus.NOT_FOUND,
        )
      })
  }

  async getUserByEmail(email: string): Promise<Users> {
    return await this.repo
      .findOneOrFail({
        where: {
          email: email,
        },
      })
      .catch(() => {
        throw new EntityNotFoundError(Users, 'did not find user')
      })
  }

  async createUser(newUser: Users): Promise<Users> {
    await this.repo
      .exists({
        where: {
          userId: newUser.userId,
        },
      })
      .then((exists) => {
        if (exists) {
          throw new HttpException(
            `User with ID ${newUser.userId} already exists!`,
            HttpStatus.BAD_REQUEST,
          )
        }
      })

    return await this.repo.save(newUser)
  }

  async updateUser(routeId: number, userToUpdate: Users) {
    if (routeId != userToUpdate.userId) {
      throw new HttpException(
        `Route ID and Body ID do not match`,
        HttpStatus.BAD_REQUEST,
      )
    }

    await this.repo
      .exists({
        where: {
          userId: userToUpdate.userId,
        },
      })
      .then((exists) => {
        if (!exists) {
          throw new HttpException(
            `User with ID ${userToUpdate.userId} does not exists!`,
            HttpStatus.NOT_FOUND,
          )
        }
      })

    return await this.repo.save(userToUpdate)
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id)
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
