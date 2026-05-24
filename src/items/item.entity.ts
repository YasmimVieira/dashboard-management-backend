import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  email!: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  priority!: string;

  @Column()
  description!: string;

  @Column()
  dueDate!: Date;
  
  @Column()
  createdAt!: Date;
  
  @Column()
  updatedAt!: Date;
}