import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './item.dto';

@ApiTags('Items')
@ApiBearerAuth('access-token')
@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Post()
    @ApiOperation({ summary: 'Criar item', description: 'Cria um novo item no sistema' })
    @ApiResponse({ status: 201, description: 'Item criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar itens', description: 'Retorna todos os itens cadastrados' })
    @ApiResponse({ status: 200, description: 'Lista de itens retornada com sucesso' })
    findAll() {
        return this.itemsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar item por ID' })
    @ApiParam({ name: 'id', description: 'UUID do item', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
    @ApiResponse({ status: 200, description: 'Item encontrado' })
    @ApiResponse({ status: 404, description: 'Item não encontrado' })
    findOne(@Param('id') id: string) {
        return this.itemsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar item', description: 'Atualiza os dados de um item existente' })
    @ApiParam({ name: 'id', description: 'UUID do item', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
    @ApiResponse({ status: 200, description: 'Item atualizado com sucesso' })
    @ApiResponse({ status: 404, description: 'Item não encontrado' })
    update(@Param('id') id: string, @Body() updateItemDto: CreateItemDto) {
        return this.itemsService.update(id, updateItemDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover item' })
    @ApiParam({ name: 'id', description: 'UUID do item', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
    @ApiResponse({ status: 200, description: 'Item removido com sucesso' })
    @ApiResponse({ status: 404, description: 'Item não encontrado' })
    remove(@Param('id') id: string) {
        return this.itemsService.remove(id);
    }
}
