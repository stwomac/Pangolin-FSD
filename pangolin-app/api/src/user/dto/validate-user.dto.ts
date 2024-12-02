import { PickType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

/**
 * This class represents the data required to validate a user for authentication.
 *
 * Note: This class is VERY similar to {@link CreateUserDto}. Keeping this seperate
 * allows us to expand {@link CreateUserDto} in the future.
 */
export class ValidateUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
