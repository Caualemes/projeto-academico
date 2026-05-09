import { Body, Controller, Post, Get, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { LocalAuthGuard } from './config/guards/local-auth.guard';
import { EsqueciSenhaDto } from './dto/esqueci-senha.dto';
import { RedefinirSenhaDto } from './dto/redefinir-senha.dto';

@Controller('rest/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('esqueci-senha')
  async esqueciSenha(@Body() dto: EsqueciSenhaDto) {
    return this.authService.esqueciSenha(dto.email);
  }

  @Post('redefinir-senha')
  async redefinirSenha(@Body() dto: RedefinirSenhaDto) {
    return this.authService.redefinirSenha(dto.email, dto.token, dto.novaSenha);
  }

  @Get('confirmar-email')
  async confirmarEmail(@Query('email') email: string, @Query('token') token: string) {
    return this.authService.confirmarEmail(email, token);
  }
}
