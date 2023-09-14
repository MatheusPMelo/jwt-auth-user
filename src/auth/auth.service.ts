import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login() {
    return 'fez o login';
  }
}
