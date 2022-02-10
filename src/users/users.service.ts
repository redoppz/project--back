import { Body, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { createHmac } from 'crypto';
import { SignInUserDto } from "./dto/users.dto";
import { User } from "./user.entity";

export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string) {
    const secret = 'abcdefg';
    const hashPassword = createHmac('sha256', secret).update(password).digest('hex');
    let user = this.userRepository.create({
      email,
      hashPassword
    });
    await this.userRepository.save(user);
  }

  async getToken(userEmail: string, userPassword: string) {
    const secret = 'abcdefg';
    return this.userRepository.find({
      where: {
        email: userEmail,
        hashPassword: createHmac('sha256', secret).update(userPassword).digest('hex')
      }
    })
  }

  async findAll() {
    return this.userRepository.find();
  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}
