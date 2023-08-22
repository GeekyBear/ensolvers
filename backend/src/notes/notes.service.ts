import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  create(createNoteDto: CreateNoteDto) {
    return this.notesRepository.save(createNoteDto);
  }

  findAll(isArchived: boolean): Promise<Note[]> {
    return this.notesRepository.find({
      where: {
        archived: isArchived,
      },
    });
  }

  findOne(id: number) {
    return this.notesRepository.find({
      where: {
        id,
      },
    });
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return this.notesRepository.update(id, updateNoteDto);
  }

  remove(id: number) {
    return this.notesRepository.delete(id);
  }
}
