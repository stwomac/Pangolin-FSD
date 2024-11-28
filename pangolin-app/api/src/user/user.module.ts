import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user'
import { PassportModule } from '@nestjs/passport'
import { AuthModule } from 'src/auth/auth.module'
import { AuthService } from 'src/auth/auth.service'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule, UserService, AuthService],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
