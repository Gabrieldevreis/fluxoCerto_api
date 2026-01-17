import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { resetDatabase } from '../../test/setup';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await resetDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST) - criar usuário', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'teste@teste.com', password: '123456' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'teste@teste.com');
  });

  it('/auth/login (POST) - login usuário', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'teste@teste.com', password: '123456' })
      .expect(200);

    expect(res.body).toHaveProperty('access_token');
    token = res.body.access_token;
  });

  let token: string;
});
