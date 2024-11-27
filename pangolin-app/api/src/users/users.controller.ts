import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { Users } from './users'
import { DeleteResult } from 'typeorm'
import { LocalGuard } from 'src/guards/local.guard'
import { JwtAuthGuard } from 'src/guards/jwt.guard'
import { CreateUserDto } from './dto/create-user-dto'
import { AuthService } from 'src/auth/auth.service'
import { ValidateUserDto } from './dto/validate-user.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  //get all
  // UseGuards decorator with JWT Auth guard provides only service to logged in users.
  //this is applied here for testing purposes only. TODO

  @UseGuards(JwtAuthGuard)
  @Get('secrets')
  @HttpCode(200)
  superSecreteMethod() {
    return `____________________________________
< congrats, you found the secret cow >
 ------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
                \`\`\`\``
  }

  @Get()
  @HttpCode(200)
  getAll(): Promise<Users[]> {
    return this.usersService.getAll()
  }

  // get by ID
  @Get(':id')
  get(@Param('id') idToFind: number): Promise<Users> {
    return this.usersService.getById(idToFind)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() userToUpdate): Promise<Users> {
    const user = await this.usersService.getById(id)
    return await this.usersService.update(user, userToUpdate)
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() userToLogin: ValidateUserDto) {
    return await this.authService.validateLogin(userToLogin) // Await the promise
  }

  @Post('/create')
  @HttpCode(201)
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.create(newUser)
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<Users> {
    const user = await this.usersService.getById(id)
    return await this.usersService.delete(user)
  }
}
