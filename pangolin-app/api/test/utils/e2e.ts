import { Test, TestingModule } from '@nestjs/testing'
import { ModuleMetadata, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from 'src/env.validation'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

export type { INestApplication }

type MockAppProps = Pick<TypeOrmModuleOptions, 'entities'> &
  Pick<ModuleMetadata, 'imports' | 'providers'>

export async function getMockApp({
  entities,
  imports,
  providers,
}: MockAppProps) {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ validate }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.TEST_DATABASE_HOST,
        port: process.env.TEST_DATABASE_PORT,
        username: process.env.TEST_DATABASE_USERNAME,
        password: process.env.TEST_DATABASE_PASSWORD,
        database: process.env.TEST_DATABASE_NAME,
        dropSchema: true,
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        entities,
      }),
      ...(imports ?? []),
    ],
    providers,
  }).compile()
  const app = moduleFixture.createNestApplication()
  await app.init()
  return app
}
