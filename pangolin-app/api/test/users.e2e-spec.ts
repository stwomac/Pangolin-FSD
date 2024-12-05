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

//Describe test suite for Users endpoint
describe('Users - /users (e2e)', () => {
  let app: INestApplication
  let userRepo: Repository<User>

  //Before all tests, create a mock app and get user repository
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

  //After all tests, close app
  afterAll(async () => {
    await Promise.all([app.close()])
  })

  // Test case for creating a user
  it ('Create user [POST /users]', async() => { 
    const creatUserData = {
      email: 'user@domain.com',
      password: 'st0ngP@ssword',
      role: 'admin',
    }
 
    const expectedStatusCode = 201
    // Send a POST request to create a user and check the response
      const { body: user } = await request(app.getHttpServer())
        .post('/users')
        .send(creatUserData)
        .expect(function (res) {
          if (res.status != expectedStatusCode) {
            console.log(JSON.stringify(res.body, null, 2))
          }
        })
        .expect(expectedStatusCode) 
        // Verify the response contains the expected user data
        expect(user).toEqual<Partial<User>>(
          expect.objectContaining({
            userId: expect.any(Number),
            email: creatUserData.email,
            role: expect.toBeOneOf(['admin', 'user', undefined]),
            reports: expect.toBeArrayOfSize(0),
          }),
        )
    })

  // Test case for getting a user by ID
  it('Get user [GET /users/:userId]', async() => { 

    const extepctedStatusCode = 200 
    // Send a GET request to retrieve a user by ID and check the response
      const {body: user} = await request(app.getHttpServer())
        .get(`/users/1`)
        .expect(function (res) {
          if (res.status != extepctedStatusCode) {
            console.log(JSON.stringify(res.body, null, 2))
          }
        })
        .expect(extepctedStatusCode)
       // Verify the response contains the expected user data
      expect(user).toEqual<Partial<User>>(
        expect.objectContaining({
          userId: expect.any(Number),
          email: expect.any(String),
          role: expect.toBeOneOf(['admin', 'user', undefined]),
          reports: expect.toBeArrayOfSize(0),
        }),
      )
    }) 

    // Test case for updating a user
    it('Update user [PUT /users]', async () => {
      const updateUserData = {
        userId: 1,
        email: 'updated@domain.com',
        role: 'user',
      }
  
      const expectedStatusCode = 200
      // Send a PUT request to update a user and check the response
      const { body: user } = await request(app.getHttpServer())
        .put('/users')
        .send(updateUserData)
        .expect(function (res) {
          if (res.status != expectedStatusCode) {
            console.log(JSON.stringify(res.body, null, 2))
          }
        })
        .expect(expectedStatusCode)
      // Verify the response contains the updated user data
      expect(user).toEqual<Partial<User>>(
        expect.objectContaining({
          userId: updateUserData.userId,
          email: updateUserData.email,
          role: updateUserData.role,
          reports: expect.toBeArrayOfSize(0),
        }),
      )
    })
  
    // Test case for deleting a user
    it('Delete user [DELETE /users/:userId]', async () => {
      const expectedStatusCode = 204
      // Send a DELETE request to delete a user and check the response
      await request(app.getHttpServer())
        .delete(`/users/1`)
        .expect(function (res) {
          if (res.status != expectedStatusCode) {
            console.log(JSON.stringify(res.body, null, 2))
          }
        })
        .expect(expectedStatusCode)
    })

})
