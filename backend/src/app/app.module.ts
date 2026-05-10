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
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST') || 'smtp.ethereal.email',
          port: configService.get('MAIL_PORT') || 587,
          auth: {
            user: configService.get('MAIL_USER') || 'test',
            pass: configService.get('MAIL_PASS') || 'test',
          },
        },
        defaults: {
          from: '"Projeto Acadêmico" <noreply@projetoacademico.com>',
        },
      }),
    }),
    CidadeModule,
    ResourceModule,
    UsuarioModule,
    AuthModule,
    ProfessorModule,
  ],
})
export class AppModule {}
