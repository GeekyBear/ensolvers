import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateNoteDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoriesRepository.update(id, updateNoteDto);
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
