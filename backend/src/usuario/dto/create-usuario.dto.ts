import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString()
  firstName: string = '';

  @IsNotEmpty({ message: 'Sobrenome não pode ser vazio' })
  @IsString()
  lastName: string = '';

  @IsNotEmpty({ message: 'Username não pode ser vazio' })
  @IsString()
  username: string = '';

  @IsNotEmpty({ message: 'E-mail não pode ser vazio' })
  @IsEmail({}, { message: 'E-mail deve ter um formato válido' })
  email: string = '';

  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @IsString()
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
  password: string = '';
}
