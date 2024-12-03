import { IsEmail, IsStrongPassword, IsEnum } from 'class-validator'

const userRoleEnumValues = ['admin', 'user'] as const
type UserRole = (typeof userRoleEnumValues)[number]

export class CreateUserDto {
  @IsEmail()
  email: string
  @IsStrongPassword()
  password: string // plain text password that will be hashed later
}
