import { Usuario } from '../../entities/usuario.entity';
import { UsuarioResponse } from '../response/usuario.response';

export class ConverterUsuario {
  static toUsuarioResponse(usuario: Usuario): UsuarioResponse {
    const usuarioResponse = new UsuarioResponse();
    usuarioResponse.idUsuario = usuario.idUsuario;
    usuarioResponse.firstName = usuario.firstName;
    usuarioResponse.lastName = usuario.lastName;
    usuarioResponse.username = usuario.username;
    usuarioResponse.email = usuario.email;
    usuarioResponse.nomeCompleto = `${usuario.firstName} ${usuario.lastName}`;
    return usuarioResponse;
  }

  static toListUsuarioResponse(usuarios: Usuario[]): UsuarioResponse[] {
    return usuarios.map((usuario) => this.toUsuarioResponse(usuario));
  }
}
