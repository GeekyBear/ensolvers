import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const { categories, ...noteData } = createNoteDto;
    const note = this.notesRepository.create(noteData);

    if (categories && categories.length > 0) {
      note.categories = await Promise.all(
        categories.map(async (categoryName) => {
          let category = await this.categoryRepository.findOne({
            where: { name: categoryName },
          });
          if (!category) {
            category = this.categoryRepository.create({ name: categoryName });
            await this.categoryRepository.save(category);
          }
          return category;
        }),
      );
    }

    return this.notesRepository.save(note);
  }
  async findAll(): Promise<Note[]> {
    return this.notesRepository.find({
      relations: ['categories'],
    });
  }

  async getNonArchivedNotes(): Promise<Note[]> {
    return this.notesRepository.find({
      where: { isArchived: false },
      relations: ['categories'],
    });
  }

  async getArchivedNotes(): Promise<Note[]> {
    return this.notesRepository.find({
      where: { isArchived: true },
      relations: ['categories'],
    });
  }

  async findOne(id: string): Promise<Note> {
    return this.notesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const { categories, ...noteData } = updateNoteDto;
    await this.notesRepository.update(id, noteData);
    const note = await this.notesRepository.findOne({ where: { id } });

    if (categories) {
      if (categories.length > 0) {
        note.categories = await Promise.all(
          categories.map(async (categoryName) => {
            let category = await this.categoryRepository.findOne({
              where: { name: categoryName },
            });
            if (!category) {
              category = this.categoryRepository.create({ name: categoryName });
              await this.categoryRepository.save(category);
            }
            return category;
          }),
        );
      } else {
        note.categories = [];
      }
    }
    return this.notesRepository.save(note);
  }

  async remove(id: string): Promise<void> {
    await this.notesRepository.delete(id);
  }

  private async findNoteById(id: string): Promise<Note> {
    if (!id) {
      throw new Error('Invalid ID');
    }
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) {
      throw new Error('Note not found');
    }
    return note;
  }

  async archive(id: string): Promise<Note> {
    try {
      const note = await this.findNoteById(id);
      note.isArchived = true;
      await this.notesRepository.update(id, note);
      return note;
    } catch (error) {
      throw new Error(`Failed to archive note: ${error.message}`);
    }
  }

  async unarchive(id: string): Promise<Note> {
    try {
      const note = await this.findNoteById(id);
      note.isArchived = false;
      await this.notesRepository.update(id, note);
      return note;
    } catch (error) {
      throw new Error(`Failed to unarchive note: ${error.message}`);
    }
  }
}
