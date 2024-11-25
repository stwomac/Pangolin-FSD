import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'
import { ContextModule } from './context/context.module'
import { TypeModule } from './type/type.module'
import { AnnotationModule } from './annotation/annotation.module'
import { ContextTypeModule } from './context_type/context_type.module'
import { MethodModule } from './method/method.module'
import { Annotation } from './annotation/annotation'
import { Context } from './context/context'
import { ContextType } from './context_type/context_type'
import { Method } from './method/method'
import { Reports } from './reports/reports'
import { Type } from './type/type'
import { Users } from './users/users'
import { AnnotationController } from './annotation/annotation.controller'
import { ContextController } from './context/context.controller'
import { ContextTypeController } from './context_type/context_type.controller'
import { MethodController } from './method/method.controller'
import { ReportsController } from './reports/reports.controller'
import { TypeController } from './type/type.controller'
import { UsersController } from './users/users.controller'
import { AnnotationService } from './annotation/annotation.service'
import { ContextService } from './context/context.service'
import { ContextTypeService } from './context_type/context_type.service'
import { MethodService } from './method/method.service'
import { ReportsService } from './reports/reports.service'
import { TypeService } from './type/type.service'
import { UsersService } from './users/users.service'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db-pangolin-instance-1.cls8gcae0v9f.us-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'pangolin',
      password: 'iamapangolindiggingahole',
      database: 'Pangolin',
      synchronize: false,
      entities: [
        Annotation,
        Context,
        ContextType,
        Method,
        Reports,
        Type,
        Users,
      ],
    }),
    UsersModule,
    ReportsModule,
    ContextModule,
    TypeModule,
    AnnotationModule,
    ContextTypeModule,
    MethodModule,
  ],
  controllers: [
    AppController,
    AnnotationController,
    ContextController,
    ContextTypeController,
    MethodController,
    ReportsController,
    TypeController,
    UsersController,
  ],
  providers: [
    AppService,
    AnnotationService,
    ContextService,
    ContextTypeService,
    MethodService,
    ReportsService,
    TypeService,
    UsersService,
  ],
})
export class AppModule {}
