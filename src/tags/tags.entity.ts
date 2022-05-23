import { Question } from 'src/questions/questions.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  constructor(text: string) {
    this.text = text;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToMany((type) => Question, (question: Question) => question.tags)
  questions: Question[];
}
