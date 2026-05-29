import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Items } from 'src/items/items.entity';

@Entity('users')
@Unique('uq_email', ['email'])
@Index('idx_email', ['email'])
@Index('idx_created_at', ['createdAt'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email!: string;

  @Column({ type: 'varchar', nullable: false })
  @Exclude()
  password!: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'varchar', nullable: true })
  @Exclude() 
  refreshToken!: string | null;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin!: Date | null;

//   @OneToMany(() => Items, item => item.owner, {
//     cascade: true,
//     lazy: false,
//   })
//   items!: Items[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  isValidPassword(password: string): boolean {
    return !!password && password.length >= 6;
  }

  getPublicData() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    };
  }
}