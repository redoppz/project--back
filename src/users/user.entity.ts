import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1, description: 'user unique id' })
	id: number;

	@Column({ length: 100, unique: true })
	@ApiProperty({ example: 'demo@yandex.ru', description: 'User email' })
	email: string;

	@Column({ length: 100 })
	@ApiProperty({ example: 'qwerty123', description: 'User password' })
	hashPassword: string;

	@CreateDateColumn()
	@ApiProperty({ example: '2022-02-10T10:26:43.190Z', description: 'User create datetime' })
	createdAt: Date;

	@UpdateDateColumn()
	@ApiProperty({ example: '2022-02-10T10:26:43.190Z', description: 'User update datetime' })
	updatedAt: Date;
}
