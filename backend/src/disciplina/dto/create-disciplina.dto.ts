import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDisciplinaDto {
  @IsNotEmpty({ message: 'O nome da disciplina é obrigatório' })
  @IsString()
  @MaxLength(50)
  nomeDisciplina: string = '';

  @IsNotEmpty({ message: 'O período é obrigatório' })
  @IsInt()
  periodo: number = 0;

  @IsOptional()
  @IsInt()
  idProfessor?: number;
}
