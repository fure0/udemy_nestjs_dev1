import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.model';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id') // /items/id
  findById(@Param('id', ParseUUIDPipe) id: string): Item {
    return this.itemsService.findById(id);
  }

  /*
    @Post()
    create(
      @Body('id') id: string,
      @Body('name') name: string,
      @Body('price') price: number,
      @Body('description') description: string,
    ): Item {
      const item: Item = {
        id,
        name,
        price,
        description,
        status: 'ON_SALE',
      };
      return this.itemsService.create(item);
    }
  */

  @Post()
  create(@Body() createItemDto: CreateItemDto): Item {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  updateStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.itemsService.delete(id);
  }
}
