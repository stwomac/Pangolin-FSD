import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './users'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from 'src/strategies/local.strategy'
import { JwtStrategy } from 'src/strategies/jwt.strategy'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => AuthModule),
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy],
})
export class UsersModule {}
