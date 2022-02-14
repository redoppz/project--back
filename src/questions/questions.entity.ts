import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Question {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({type: 'text'})
	text: string;

	@Column({type: 'text'})
	answer: string;

	@CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
