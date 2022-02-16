import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
	@IsString()
	// @IsNotEmpty()
	// @ApiProperty({ example: 'demo@yandex.ru', description: 'User email' })
	email?: string;

	@IsString()
	// @IsNotEmpty()
	// @ApiProperty({ example: 'qwerty123', description: 'User password' })
	password?: string;
}

export class SignInUserDto {
	@IsString()
	@IsNotEmpty()
	// @ApiProperty({ example: 'demo@yandex.ru', description: 'User email' })
	email: string;

	@IsString()
	@IsNotEmpty()
	// @ApiProperty({ example: 'qwerty123', description: 'User password' })
	password: string;
}
