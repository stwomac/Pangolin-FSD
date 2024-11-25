import { Module } from '@nestjs/common'
import { MethodService } from './method.service'
import { MethodController } from './method.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Method } from './method'

@Module({
  imports: [TypeOrmModule.forFeature([Method])],
  exports: [TypeOrmModule],
  controllers: [MethodController],
  providers: [MethodService],
})
export class MethodModule {}
