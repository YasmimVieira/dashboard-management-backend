import { Module } from '@nestjs/common';
import { Items } from './items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
    imports:[TypeOrmModule.forFeature([Items])],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule {}
