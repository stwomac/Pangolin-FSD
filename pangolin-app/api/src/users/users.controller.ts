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
  getAllusers(): Promise<Users[]> {
    return this.usersService.getAllUsers()
  }

  // get by ID
  @Get(':id')
  @HttpCode(200)
  getUserById(@Param('id') idToFind: number): Promise<Users> {
    return this.usersService.getUserById(idToFind)
  }

  @Put('/update/:id')
  @HttpCode(200)
  updateUser(@Param('id') routeId: number, @Body() UserToUpdate) {
    return this.usersService.updateUser(routeId, UserToUpdate)
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
  createUser(@Body() newUser: Users) {
    return this.usersService.createUser(newUser)
  }

  @Delete('/delete/:id')
  @HttpCode(204)
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.usersService.deleteUser(id)
  }
}