import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { disconnect } from 'mongoose'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { AuthDto } from '../src/auth/dto/auth.dto'


const loginDto: AuthDto = {
	email: 'test@gmail.com',
	password: 'Qwerty123'
}

describe('AppController (e2e)', () => {
	let app: INestApplication
	let createdId: string
	let token: string

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/auth/login (POST) - success', () => {
		return new Promise<void>((resolve) => {
			request(app.getHttpServer())
				.post('/auth/login')
				.send(loginDto)
				.expect(200)
				.then(({body}: request.Response) => {
					expect(body.access_token).toBeDefined()
					resolve()
				})
		})
	})

	it('/auth/login (POST) - fail password', () => {
		return new Promise<void>((resolve) => {
			request(app.getHttpServer())
				.post('/auth/login')
				.send({...loginDto, password: '1'})
				.expect(401, {
					statusCode: 401,
					message: 'Неверный пароль',
					error: 'Unauthorized'
				})

			resolve()
		})
	})

	it('/auth/login (POST) - fail email', () => {
		return new Promise<void>((resolve) => {
			request(app.getHttpServer())
				.post('/auth/login')
				.send({...loginDto, email: '1@qwe.ru'})
				.expect(401, {
					statusCode: 401,
					message: 'Пользователь с таким email не найден',
					error: 'Unauthorized'
				})

			resolve()
		})
	})

	afterAll(() => {
		disconnect()
	})
})

