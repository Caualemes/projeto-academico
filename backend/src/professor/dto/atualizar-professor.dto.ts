import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDto } from './create-professor.dto';

export class AtualizarProfessorDto extends PartialType(CreateProfessorDto) {}
