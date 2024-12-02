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
  Request,
} from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user'
import { JwtAuthGuard } from 'src/guards/jwt.guard'
import { AuthService } from 'src/auth/auth.service'
import { ValidateUserDto } from './dto/validate-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  //get all
  // UseGuards decorator with JWT Auth guard provides only service to logged in users.
  //this is applied here for testing purposes only. TODO

  @UseGuards(JwtAuthGuard)
  @Get('secrets')
  @HttpCode(200)
  superSecreteMethod() {
    console.log('someone found the secret cow!')
    return {
      cow: `____________________________________
< congrats, you found the secret cow >
 ------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
                \`\`\`\``,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  @HttpCode(200)
  async getUserInfo(@Request() req: any) {
    const user = await this.usersService.getById(req.user.sub);
    console.log(user);
    return user;
  }

  @Get()
  @HttpCode(200)
  getAll(): Promise<User[]> {
    return this.usersService.getAll()
  }

  // get by ID
  @Get(':id')
  get(@Param('id') idToFind: number): Promise<User> {
    return this.usersService.getById(idToFind)
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() userToLogin: ValidateUserDto) {
    return await this.authService.validateLogin(userToLogin) // Await the promise
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.create(newUser)
  }

  @Put()
  update(@Body() userToUpdate: UpdateUserDto): Promise<User> {
    return this.usersService.update(userToUpdate)
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    const user = await this.usersService.getById(id)
    await this.usersService.delete(user)
  }
}
