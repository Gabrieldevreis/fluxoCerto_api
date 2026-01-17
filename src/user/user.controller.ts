import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body.email, body.password);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
