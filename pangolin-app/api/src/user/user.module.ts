import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './user.service'
import { UsersController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './user'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from 'src/strategies/local.strategy'
import { JwtStrategy } from 'src/strategies/jwt.strategy'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy],
})
export class UsersModule {}
