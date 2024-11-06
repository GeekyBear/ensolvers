import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  @IsOptional()
  isArchived: boolean;

  @IsOptional()
  categories?: string[];
}
