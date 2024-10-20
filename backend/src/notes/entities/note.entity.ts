import { Category } from 'src/categories/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  isArchived: boolean;

  @ManyToMany(() => Category, (category) => category.notes, { cascade: true })
  @JoinTable()
  categories: Category[];
}
