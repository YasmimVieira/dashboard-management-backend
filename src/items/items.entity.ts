import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('items')
export class CreateItems {
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

    @Column()
    createdAt!: Date;
    
    @Column()
    updatedAt!: Date;
}