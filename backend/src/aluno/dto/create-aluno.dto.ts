import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAlunoDto {
  @IsNotEmpty({ message: 'O código do aluno é obrigatório' })
  @IsString()
  @MaxLength(10)
  codAluno: string = '';

  @IsOptional()
  @IsString()
  @MaxLength(50)
  nomeAluno?: string;

  @IsOptional()
  @IsInt()
  idade?: number;

  @IsNotEmpty({ message: 'O usuário é obrigatório' })
  @IsInt()
  idUsuario: number = 0;
}
