import { Module } from '@nestjs/common'
import { TypeService } from './type.service'
import { TypeController } from './type.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Type } from './type'

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  exports: [TypeOrmModule],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
