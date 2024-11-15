import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { ContextModule } from './context/context.module';
import { TypeModule } from './type/type.module';
import { AnnotationModule } from './annotation/annotation.module';
import { ContextTypeModule } from './context_type/context_type.module';
import { MethodModule } from './method/method.module';

@Module({
  imports: [UsersModule, ReportsModule, ContextModule, TypeModule, AnnotationModule, ContextTypeModule, MethodModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
