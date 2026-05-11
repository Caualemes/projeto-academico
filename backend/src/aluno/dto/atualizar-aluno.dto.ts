import { PartialType } from '@nestjs/mapped-types';
import { CreateAlunoDto } from './create-aluno.dto';

export class AtualizarAlunoDto extends PartialType(CreateAlunoDto) {}
