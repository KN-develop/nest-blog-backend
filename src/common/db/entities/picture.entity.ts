import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { type } from 'os';
import * as buffer from 'buffer';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  data: string;
}