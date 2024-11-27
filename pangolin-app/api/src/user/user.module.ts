import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from 'src/strategies/local.strategy'
import { JwtStrategy } from 'src/strategies/jwt.strategy'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy],
})
export class UserModule {}
