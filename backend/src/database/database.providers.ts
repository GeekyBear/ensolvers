import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Note } from 'src/notes/entities/note.entity';

export const DatabaseProvider = [
  TypeOrmModule.forRoot({
    ssl: false,
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    port: 5436,
    synchronize: true,
    entities: [Note, Category],
    migrations: [__dirname + '../migrations/*{.ts,.js}'],
  }),
];
