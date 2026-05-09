import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RedefinirSenhaDto {
  @IsNotEmpty()
  @IsString()
  email: string = '';

  @IsNotEmpty()
  @IsString()
  token: string = '';

  @IsNotEmpty({ message: 'Nova senha não pode ser vazia' })
  @IsString()
  @MinLength(6, { message: 'A nova senha deve conter no mínimo 6 caracteres' })
  novaSenha: string = '';
}
