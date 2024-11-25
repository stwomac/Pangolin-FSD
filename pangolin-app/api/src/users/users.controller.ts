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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get all
  // UseGuards decorator with JWT Auth guard provides only service to logged in users.
  //this is applied here for testing purposes only. TODO

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

  //LocalGuard here checks the password and email of the user to provide JWT
  @Post('/login')
  @UseGuards(LocalGuard)
  @HttpCode(200)
  async login(@Body() userToLogin: Users) {
    const token = await this.usersService.validateUser(userToLogin) // Await the promise
    return token // Explicitly return the token
  }

  @Post('/create')
  @HttpCode(201)
  create(@Body() newUser: Users) {
    return this.usersService.create(newUser)
  }

  @Delete('/delete/:id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<Users> {
    const user = await this.usersService.getById(id)
    return await this.usersService.delete(user)
  }
}
