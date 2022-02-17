import { Body, Controller, Delete, Get, HttpException, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { SignInUserDto, SignUpUserDto } from './dto/users.dto';
import { User } from './user.entity';
import { UsersService } from "./users.service";

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService) { };

	@ApiOperation({ summary: 'Create a user' })
	@ApiResponse({ status: 201, type: User })
	@Post('/signUp')
	async signUp(@Body() data: SignUpUserDto) {
		return await this.usersService.createUser(data.email, data.password);
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@Get('/list')
	async getUsers() {
		return this.usersService.findAll();
	}

	@ApiOperation({ summary: 'Get auth token' })
	@ApiResponse({ status: 201, type: String })
	@Post('/signIn')
	async signIn(@Body() data: SignInUserDto) {
		console.log(data);
		return this.usersService.getToken(data.email, data.password);
	}

	@ApiOperation({ summary: 'Delete user by id' })
	@ApiResponse({ status: 204, type: String })
	@Delete('/:id')
	async deleteUser(@Param('id') id: string) {
		return this.usersService.deleteUser(id);
	}
}
