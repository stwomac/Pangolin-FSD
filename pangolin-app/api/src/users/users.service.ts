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
import { DeleteResult, EntityNotFoundError, Repository } from 'typeorm'
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
          user_id: idToFind,
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
    try {
      return await this.repo.findOneOrFail({
        where: {
          email: email,
        },
      })
    } catch (e) {
      throw new EntityNotFoundError(Users, 'did not find user')
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    let exists = await this.repo.exists({
      where: {
        email: createUserDto.email,
      },
    })

    if (exists) {
      throw new HttpException(
        `User with ID ${createUserDto.email} already exists!`,
        HttpStatus.BAD_REQUEST,
      )
    }

    let toCreate: Users = new Users()
    toCreate.email = createUserDto.email
    toCreate.role = 'user'

    toCreate.pass_hash = await this.authService.hashPassword(
      createUserDto.password,
    )

    let result: boolean = await compare(
      createUserDto.password + AuthValues.PEPPER,
      toCreate.pass_hash,
    )

    return await this.repo.save(toCreate)
  }

  async updateUser(routeId: number, userToUpdate: Users) {
    if (routeId != userToUpdate.user_id) {
      throw new HttpException(
        `Route ID and Body ID do not match`,
        HttpStatus.BAD_REQUEST,
      )
    }

    await this.repo
      .exists({
        where: {
          user_id: userToUpdate.user_id,
        },
      })
      .then((exists) => {
        if (!exists) {
          throw new HttpException(
            `User with ID ${userToUpdate.user_id} does not exists!`,
            HttpStatus.NOT_FOUND,
          )
        }
      })

    return await this.repo.save(userToUpdate)
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id)
  }
}
