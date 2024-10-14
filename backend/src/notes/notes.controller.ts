import { Controller, Get, Param, Patch, Body, Delete, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get('non-archived')
  async getNonArchivedNotes(): Promise<Note[]> {
    return this.notesService.getNonArchivedNotes();
  }

  @Get('archived')
  async getArchivedNotes(): Promise<Note[]> {
    return this.notesService.getArchivedNotes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }

  @Patch(':id/archive')
  archive(@Param('id') id: string) {
    return this.notesService.archive(id);
  }

  @Patch(':id/unarchive')
  unarchive(@Param('id') id: string) {
    return this.notesService.unarchive(id);
  }
}