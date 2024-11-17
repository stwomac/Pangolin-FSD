import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get all
  @Get()
  @HttpCode(200)
  getAllCourses(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  // get by ID
  @Get(':id')
  @HttpCode(200)
  getCourseById(@Param('id') idToFind: number): Promise<Users> {
      return this.usersService.getUserById(idToFind);
  }
}
