import { CreateItemDto } from './dto/create-item.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, ItemStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany();
  }

  async findById(id: string): Promise<Item> {
    const items = await this.prismaService.item.findUnique({
      where: {
        id: id,
      },
    });
    if (!items) {
      throw new NotFoundException();
    }
    return items;
  }

  async create(CreateItemDto: CreateItemDto): Promise<Item> {
    const { name, price, description } = CreateItemDto;
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE,
      },
    });
  }

  async updateStatus(id: string): Promise<Item> {
    return await this.prismaService.item.update({
      data: {
        status: 'SOLD_OUT',
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    await this.prismaService.item.delete({
      where: { id },
    });
  }
}
