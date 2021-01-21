import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tag } from './tag.entity';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('longtext')
  contentHtml: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  seo_title: string;

  @Column({ nullable: true })
  seo_description: string;

  @Column({ nullable: true })
  seo_keywords: string;

  @ManyToOne(() => User)
  author: User;

  @ManyToMany(() => Tag)
  tags: Tag;
}