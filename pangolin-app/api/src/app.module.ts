import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { validate } from './env.validation'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'
import { ContextModule } from './context/context.module'
import { AnnotationModule } from './annotation/annotation.module'
import { ContextTypeModule } from './context_type/context_type.module'
<<<<<<< HEAD
=======
import { MethodModule } from './method/method.module'
import { AuthModule } from './auth/auth.module'
>>>>>>> origin/feat/password_hashing

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    ReportsModule,
    ContextModule,
    AnnotationModule,
    ContextTypeModule,
<<<<<<< HEAD
=======
    MethodModule,
    AuthModule,
>>>>>>> origin/feat/password_hashing
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
