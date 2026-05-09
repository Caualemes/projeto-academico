import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioServiceCreate {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private mailerService: MailerService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioResponse> {
    const exists = await this.usuarioRepository.findOne({
      where: [
        { email: createUsuarioDto.email },
        { username: createUsuarioDto.username },
      ],
    });

    if (exists) {
      throw new ConflictException('Usuário com este e-mail ou username já existe.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, salt);

    const { password, ...dtoSemSenha } = createUsuarioDto;

    const activationToken = crypto.randomBytes(32).toString('hex');
    const hashedActivationToken = await bcrypt.hash(activationToken, salt);

    const tokenExpires = new Date();
    tokenExpires.setHours(tokenExpires.getHours() + 24);

    const usuarioData = new Usuario({
      ...dtoSemSenha,
      senha: hashedPassword,
      statusValidacao: false,
      recoveryToken: hashedActivationToken,
      tokenExpires: tokenExpires
    });

    const savedUsuario = await this.usuarioRepository.save(usuarioData);

    const confirmLink = `http://localhost:5173/confirmar-email?email=${encodeURIComponent(savedUsuario.email)}&token=${activationToken}`;

    console.log(`\n\n[DEBUG] Link de Ativação de Conta: ${confirmLink}\n\n`);

    await this.mailerService.sendMail({
      to: savedUsuario.email,
      subject: 'Confirmação de E-mail - Projeto Acadêmico',
      text: `Bem-vindo! Clique no link para confirmar seu e-mail: ${confirmLink}`,
      html: `<p>Bem-vindo!</p><p><a href="${confirmLink}">Clique aqui para confirmar seu e-mail</a></p>`,
    }).catch(err => console.error('Aviso: E-mail de ativação não enviado (configure SMTP). Use o link do console.'));

    return ConverterUsuario.toUsuarioResponse(savedUsuario);
  }
}
