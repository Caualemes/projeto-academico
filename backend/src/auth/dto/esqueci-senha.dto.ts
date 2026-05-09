import { IsEmail, IsNotEmpty } from 'class-validator';

export class EsqueciSenhaDto {
  @IsNotEmpty({ message: 'E-mail não pode ser vazio' })
  @IsEmail({}, { message: 'E-mail deve ter um formato válido' })
  email: string = '';
}
