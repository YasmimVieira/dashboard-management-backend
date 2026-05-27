import { jest, describe, beforeEach, it, expect} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { Items } from './items.entity';
import { CreateItems } from './items.dto';
import { Repository } from 'typeorm';

describe('ItemsService', () => {
  let service: ItemsService;
  let repository: Repository<Items>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: 'ItemsRepository',
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),

          },
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    repository = module.get<Repository<Items>>('ItemsRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new item with valid data', async () => {
      const createItemDto: CreateItems = {
        name: 'Test Item',
        email: 'test@example.com',
        status: 'active',
      };

      const mockItem: Items = {
        id: '123',
        ...createItemDto,
        priority: 'medium',
        description: '',
        dueDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(repository, 'create').mockReturnValue(mockItem);
      jest.spyOn(repository, 'save').mockResolvedValue(mockItem);

      const result = await service.create(createItemDto);

      expect(repository.create).toHaveBeenCalledWith(createItemDto);
      expect(repository.save).toHaveBeenCalledWith(mockItem);
      expect(result).toEqual(mockItem);
    });

    it('should fail with invalid email', async () => {
      const createItemDto: CreateItems = {
        name: 'Test Item',
        email: 'invalid-email',
        status: 'active',
      };

      await expect(service.create(createItemDto)).rejects.toThrow();
    });
  })
});
