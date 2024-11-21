import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([Users]), JwtModule.register({secret:'pangolin12345', signOptions: {expiresIn: '6h'}})],
  exports: [TypeOrmModule, JwtModule],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy],
})
export class UsersModule {}
