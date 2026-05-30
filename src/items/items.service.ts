import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from './items.entity';
import { CreateItemDto } from './item.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Items)
        private readonly itemsRepository: Repository<Items>,
    ) {}

    async create(create: CreateItemDto) {
        const item = this.itemsRepository.create(create);
        return this.itemsRepository.save(item);
    }

    async findAll() {
        return this.itemsRepository.find();
    }

    async findOne(id: string) {
        const item = await this.itemsRepository.findOneBy({ id });
        if (!item) {
            throw new NotFoundException('Item não encontrado');
        }
        return item;
    }
    
    async update(id: string, update: Partial<CreateItemDto>) {
        await this.itemsRepository.update(id, update);
        return this.findOne(id);
    }

    async remove(id: string) {
        await this.itemsRepository.delete(id);
    }
}

