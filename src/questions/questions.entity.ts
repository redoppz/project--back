import { Tag } from 'src/tags/tags.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'text' })
  answer: string;

  @ManyToMany((type) => Tag, (tag: Tag) => tag.questions)
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
