import * as request from 'supertest'
import { getMockApp, INestApplication } from './utils/e2e'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module'
import { User } from 'src/user/user'
import { ReportModule } from 'src/report/report.module'
import { Report } from 'src/report/report'
import { ContextModule } from 'src/context/context.module'
import { Context } from 'src/context/context'
import { AnnotationModule } from 'src/annotation/annotation.module'
import { Annotation } from 'src/annotation/annotation'
import { ContextTypeModule } from 'src/context-type/context-type.module'
import { ContextType } from 'src/context-type/context-type'

describe('Users - /users (e2e)', () => {
  let app: INestApplication
  let userRepo: Repository<User>

  beforeAll(async () => {
    app = await getMockApp({
      entities: [User, Report, Context, Annotation, ContextType],
      imports: [
        UserModule,
        ReportModule,
        ContextModule,
        AnnotationModule,
        ContextTypeModule,
      ],
    })
    userRepo = app.get(getRepositoryToken(User))
  })

  afterAll(async () => {
    await Promise.all([app.close()])
  })

  describe('Create user [POST /users]', () => {
    let user: User
    let initialCount: number
    const creatUserData = {
      email: 'user@domain.com',
      password: 'st0ngP@ssword',
      role: 'admin',
    }

    beforeAll(async () => {
      initialCount = await userRepo.count()
    })

    it('calls without errors', async () => {
      const expectedStatusCode = 201
      const { body } = await request(app.getHttpServer())
        .post('/users')
        .send(creatUserData)
        .expect(function (res) {
          if (res.status != expectedStatusCode) {
            console.log(JSON.stringify(res.body, null, 2))
          }
        })
        .expect(expectedStatusCode)
      user = body
    })

    it('returns user object', () => {
      expect(user).toEqual<Partial<User>>(
        expect.objectContaining({
          userId: expect.any(Number),
          email: creatUserData.email,
          role: expect.toBeOneOf(['admin', 'user', undefined]),
          reports: expect.toBeArrayOfSize(0),
        }),
      )
    })

    it("omit's passHash", () => {
      expect(user).not.toHaveProperty('passHash')
    })

    it('inserts user into  database', async () => {
      await expect(userRepo.count()).resolves.toBe(initialCount + 1)
    })
  })
})
