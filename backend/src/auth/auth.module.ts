import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from '../usuario/usuario.module';
import { LocalStrategy } from './config/strategy/local.strategy';
import { JwtStrategy } from './config/strategy/jwt.strategy';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY_ACADEMICO',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
