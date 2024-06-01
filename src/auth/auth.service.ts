import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log('auth service', password);
    const user = await this.userService.findUser(username);
    console.log(user);
    const isValid = await bcrypt.compare(password, user.password);
    console.log(isValid);
    if (isValid) {
      const { password, ...result } = user;
      console.log(password);
      return result;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
