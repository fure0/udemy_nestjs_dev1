import { CreateItemDto } from './dto/create-item.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './items.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item {
    const items = this.items.find((item) => item.id === id);
    if (!items) {
      // throw new Error('商品が存在しません');
      throw new NotFoundException();
    }
    return items;
  }

  /*
  create(item: Item): Item {
    this.items.push(item);
    return item;
  }
  */
  create(createItemDto: CreateItemDto): Item {
    const item: Item = {
      id: uuid(),
      ...createItemDto,
      status: 'ON_SALE',
    };
    this.items.push(item);
    return item;
  }

  updateStatus(id: string): Item {
    const item = this.findById(id);
    item.status = 'SOLD_OUT';
    return item;
  }

  delete(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
