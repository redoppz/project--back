import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Question {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1, description: 'question unique id' })
	id: string;

	@Column({ type: 'text' })
	@ApiProperty({ example: 'text', description: 'question text' })
	text: string;

	@Column({ type: 'text' })
	@ApiProperty({ example: 'answer', description: 'question answer' })
	answer: string;

	@CreateDateColumn()
	@ApiProperty({ example: '2022-02-10T10:26:43.190Z', description: 'Question create datetime' })
	createdAt: Date;

	@UpdateDateColumn()
	@ApiProperty({ example: '2022-02-10T10:26:43.190Z', description: 'Question update datetime' })
	updatedAt: Date;
}
