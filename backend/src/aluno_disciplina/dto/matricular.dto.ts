import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class MatricularDto {
  @IsNotEmpty()
  @IsInt()
  alunoId!: number;

  @IsNotEmpty()
  @IsInt()
  disciplinaId!: number;

  @IsString()
  status: string = 'Ativo';
}
