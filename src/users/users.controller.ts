import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { AuthService } from 'src/auth/auth.service';
import { SignInUserDto, SignUpUserDto } from "./dto/users.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
	constructor(
		private readonly userService: UsersService,
		private readonly authService: AuthService) { };

	@Post('/signUp')
	async signUp(@Body() data: SignUpUserDto) {
		await this.userService.createUser(data.email, data.password);
	}

	@Get('/list')
	async getUsers() {
		return this.userService.findAll();
	}

	@Post('/signIn')
	async signIn(@Body() data: SignInUserDto) {
		return this.userService.getToken(data.email, data.password);
	}

	@Delete('/:id')
	async deleteUser(@Param('id') id: string) {
		return this.userService.deleteUser(id);
	}
}
