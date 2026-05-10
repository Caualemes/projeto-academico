import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProfessorDto {
  @IsNotEmpty({ message: 'Código não pode ser vazio' })
  @IsString()
  codProfessor: string = '';

  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString()
  nomeProfessor: string = '';

  @IsNotEmpty({ message: 'Usuário não pode ser vazio' })
  @IsNumber()
  idUsuario!: number;
}
