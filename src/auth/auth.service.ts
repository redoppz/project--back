import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: any): Promise<any> {
    const user = await this.usersService.getUserByEmail(username);
    if (user && user.hashPassword === password) {
      const { hashPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    // 	const secret = 'abcdefg';
    // 	this.
    //   this.userRepository.find({
    //     where: {
    //       email: userEmail,
    //       hashPassword: createHmac('sha256', secret).update(userPassword).digest('hex')
    //     }
    //   })
    // 	const payload = {
    // 		email: user.email,
    // 		id: user.id
    // 	};
    // 	return {
    // 		access_token: this.jwtService.sign(payload),
    // 	};
  }
}
