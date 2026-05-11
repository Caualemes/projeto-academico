import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class LancarNotaDto {
  @IsNotEmpty()
  @IsInt()
  alunoId!: number;

  @IsNotEmpty()
  @IsInt()
  avaliacaoId!: number;

  @IsOptional()
  @IsNumber()
  nota?: number;
}
