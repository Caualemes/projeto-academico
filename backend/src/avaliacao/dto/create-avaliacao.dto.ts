import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsNotEmpty({ message: 'A descrição da avaliação é obrigatória' })
  @IsString()
  @MaxLength(100)
  descricao: string = '';

  @IsNotEmpty({ message: 'A disciplina vinculada é obrigatória' })
  @IsInt()
  disciplinaId!: number;
}
