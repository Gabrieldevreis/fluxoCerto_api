import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { resetDatabase } from '../../test/setup';

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    await resetDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'teste@teste.com', password: '123456' });

    const resLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'teste@teste.com', password: '123456' });

    token = resLogin.body.access_token;

    // Criar cliente para associar pedidos
    await request(app.getHttpServer())
      .post('/client')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Cliente X', phone: '11999999999' });
  });

  it('/order (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/order')
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'Serviço manutenção', status: 'PAY', value: 300, clientId: 1 })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.description).toBe('Serviço manutenção');
  });

  it('/order (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/order')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0);
  });
});
