import { Test } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { PrismaService } from '../prisma/prisma.service';
import { Item, ItemStatus } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  item: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('ItemsServiceTest', () => {
  let itemsService: ItemsService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
  });

  describe('findAll', () => {
    it('正常系', async () => {
      mockPrismaService.item.findMany.mockResolvedValue([]);
      const expected = [];
      const result = await itemsService.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe('findById', () => {
    it('正常系', async () => {
      const item: Item = {
        id: 'test-id1',
        name: 'test-item1',
        price: 100,
        description: '',
        status: ItemStatus.ON_SALE,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        userId: 'test-user1',
      };
      mockPrismaService.item.findUnique.mockResolvedValue(item);

      const result = await itemsService.findById('test-id1');
      expect(result).toEqual(item);
      expect(mockPrismaService.item.findUnique).toHaveBeenCalledWith({
        where: { id: 'test-id1' },
      });
    });

    it('異常系；商品が存在しない', async () => {
      mockPrismaService.item.findUnique.mockResolvedValue(null);
      await expect(itemsService.findById('test-id1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
