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

    const confirmLink = `http://localhost:3000/confirmar-email?email=${encodeURIComponent(savedUsuario.email)}&token=${activationToken}`;

    console.log(`\n\n[DEBUG] Link de Ativação de Conta gerado internamente: ${confirmLink}`);

    try {
      const info = await this.mailerService.sendMail({
        to: savedUsuario.email,
        subject: 'Confirmação de E-mail - Projeto Acadêmico',
        text: `Bem-vindo! Clique no link para confirmar seu e-mail: ${confirmLink}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="color: #3b82f6;">Bem-vindo ao Projeto Acadêmico!</h2>
            <p>Olá, ${savedUsuario.firstName}!</p>
            <p>Sua conta foi criada com sucesso, mas você precisa confirmar seu endereço de e-mail para ativá-la.</p>
            <div style="margin: 30px 0; text-align: center;">
              <a href="${confirmLink}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Confirmar Meu E-mail
              </a>
            </div>
            <p style="font-size: 0.85em; color: #6b7280; text-align: center;">
              Se o botão não funcionar, copie e cole este link no seu navegador:<br>
              <a href="${confirmLink}" style="color: #3b82f6;">${confirmLink}</a>
            </p>
          </div>
        `,
      });

      const nodemailer = require('nodemailer');
      const testUrl = nodemailer.getTestMessageUrl(info);
      if (testUrl) {
        console.log(`\n[MAILER] 📧 E-mail de Ativação de Conta capturado pelo Ethereal! Visualização rápida: ${testUrl}\n`);
      } else {
        console.log('\n[MAILER] E-mail de ativação enviado com sucesso pelo provedor configurado.\n');
      }
    } catch (err) {
      console.error('\n[MAILER] Erro ao enviar e-mail de ativação. Verifique sua configuração SMTP no .env', err);
    }

    return ConverterUsuario.toUsuarioResponse(savedUsuario);
  }
}
