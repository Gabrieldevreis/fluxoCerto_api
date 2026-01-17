import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { resetDatabase } from '../../test/setup';

describe('IncomeController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    await resetDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Criar usuário e pegar token
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'teste@teste.com', password: '123456' });

    const resLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'teste@teste.com', password: '123456' });

    token = resLogin.body.access_token;
  });

  it('/income (POST) - criar receita', async () => {
    const res = await request(app.getHttpServer())
      .post('/income')
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'Venda de produto', value: 1500 })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('description', 'Venda de produto');
  });

  it('/income (GET) - listar receitas', async () => {
    const res = await request(app.getHttpServer())
      .get('/income')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0);
  });
});
