import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { UsuarioServiceFindByEmail } from "../../usuario/service/usuario.service.findbyemail";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    
    constructor(
        private usuarioServiceFindByEmail: UsuarioServiceFindByEmail,
        private jwtService: JwtService,
        private mailerService: MailerService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usuarioServiceFindByEmail.findByEmail(username)
        if (user && await bcrypt.compare(password, user.senha)) {
            if (!user.statusValidacao) {
                throw new UnauthorizedException('Sua conta ainda não foi confirmada por e-mail.');
            }
            const { senha, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.idUsuario };
        return {
            access_token: this.jwtService.sign(payload),
            user: user
        };
    }

    async esqueciSenha(email: string) {
        const user = await this.usuarioServiceFindByEmail.findByEmail(email);
        if (!user) {
            return { message: 'Se o e-mail existir, um link de recuperação foi enviado.' };
        }

        const token = crypto.randomBytes(32).toString('hex');
        const salt = await bcrypt.genSalt(10);
        user.recoveryToken = await bcrypt.hash(token, salt);
        
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        user.tokenExpires = expires;

        await this.usuarioServiceFindByEmail.save(user);

        const resetLink = `http://localhost:5173/redefinir-senha?email=${encodeURIComponent(user.email)}&token=${token}`;

        console.log(`\n\n[DEBUG] Link de Recuperação de Senha: ${resetLink}\n\n`);

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Recuperação de Senha - Projeto Acadêmico',
            text: `Você solicitou a recuperação de senha. Clique no link para redefinir: ${resetLink}`,
            html: `<p>Você solicitou a recuperação de senha.</p><p><a href="${resetLink}">Clique aqui para redefinir sua senha</a></p>`,
        }).catch(err => console.error('Aviso: E-mail não enviado (configure o SMTP em app.module.ts). Use o link do console para testar.'));

        return { message: 'Se o e-mail existir, um link de recuperação foi enviado.' };
    }

    async redefinirSenha(email: string, token: string, novaSenha: string) {
        const user = await this.usuarioServiceFindByEmail.findByEmail(email);
        
        if (!user || !user.tokenExpires || user.tokenExpires < new Date() || !user.recoveryToken) {
            throw new BadRequestException('Token inválido ou expirado.');
        }

        const isTokenValid = await bcrypt.compare(token, user.recoveryToken);
        if (!isTokenValid) {
            throw new BadRequestException('Token inválido ou expirado.');
        }

        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(novaSenha, salt);
        user.recoveryToken = undefined;
        user.tokenExpires = undefined;

        await this.usuarioServiceFindByEmail.save(user);

        return { message: 'Senha redefinida com sucesso.' };
    }

    async confirmarEmail(email: string, token: string) {
        const user = await this.usuarioServiceFindByEmail.findByEmail(email);

        if (!user || !user.tokenExpires || user.tokenExpires < new Date() || !user.recoveryToken) {
            throw new BadRequestException('Token de ativação inválido ou expirado.');
        }

        const isTokenValid = await bcrypt.compare(token, user.recoveryToken);
        if (!isTokenValid) {
            throw new BadRequestException('Token de ativação inválido ou expirado.');
        }

        user.statusValidacao = true;
        user.recoveryToken = undefined;
        user.tokenExpires = undefined;

        await this.usuarioServiceFindByEmail.save(user);

        return { message: 'E-mail confirmado com sucesso. Você já pode fazer login.' };
    }
}