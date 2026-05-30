import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('items')
export class Items {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    status!: string;

    @Column({ default: 'medium' })
    priority!: string;

    @Column({ default: '' })
    description!: string;

    @Column({ type: 'timestamp', nullable: true })
    dueDate!: Date | null;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}