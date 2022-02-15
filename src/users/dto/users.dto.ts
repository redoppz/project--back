import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	password: string;
}

export class SignInUserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	password: string;
}
