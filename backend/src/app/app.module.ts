import { Module } from '@nestjs/common'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import * as Joi from 'joi';
import { CidadeModule } from 'src/cidade/cidade.module';
import { ResourceModule } from '../resources/resources.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthModule } from '../auth/auth.module';

import { ProfessorModule } from '../professor/professor.module';
import { AlunoModule } from '../aluno/aluno.module';
import { DisciplinaModule } from '../disciplina/disciplina.module';
import { AvaliacaoModule } from '../avaliacao/avaliacao.module';
import { AlunoDisciplinaModule } from '../aluno_disciplina/aluno-disciplina.module';
import { AlunoAvaliacaoModule } from '../aluno_avaliacao/aluno-avaliacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(1521),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),
        DATABASE_AUTOLOADENTITIES: Joi.boolean().default(true),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        database: configService.get('DATABASE_DATABASE'),
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: configService.get('DATABASE_SYNCHRONIZE'),
        logging: ['query', 'error'],
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let host = configService.get('EMAIL_HOST');
        let port = configService.get('EMAIL_PORT');
        let user = configService.get('EMAIL_USER');
        let pass = configService.get('EMAIL_PASSWORD');
        let secure = configService.get('EMAIL_SECURE') === 'true';

        if (!user || !pass) {
          console.log('\n[MAILER] Gerando conta de teste Ethereal para envio de e-mails...\n');
          const nodemailer = require('nodemailer');
          const testAccount = await nodemailer.createTestAccount();
          host = testAccount.smtp.host;
          port = testAccount.smtp.port;
          secure = testAccount.smtp.secure;
          user = testAccount.user;
          pass = testAccount.pass;
        }

        return {
          transport: {
            host,
            port,
            secure,
            auth: { user, pass },
            tls: {
              rejectUnauthorized: configService.get('EMAIL_TLS') !== 'false',
            }
          },
          defaults: {
            from: `"${configService.get('EMAIL_FROM_NAME') || 'Projeto Acadêmico'}" <${configService.get('EMAIL_FROM') || 'noreply@projetoacademico.com'}>`,
          },
        };
      },
    }),
    CidadeModule,
    ResourceModule,
    UsuarioModule,
    AuthModule,
    ProfessorModule,
    AlunoModule,
    DisciplinaModule,
    AvaliacaoModule,
    AlunoDisciplinaModule,
    AlunoAvaliacaoModule,
  ],
})
export class AppModule {}
