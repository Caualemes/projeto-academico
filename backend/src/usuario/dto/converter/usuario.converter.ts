import { Usuario } from '../../entities/usuario.entity';
import { UsuarioResponse } from '../response/usuario.response';
import { ROTA } from '../../../commons/constants/url.sistema';

export class ConverterUsuario {
  static toUsuarioResponse(usuario: Usuario): UsuarioResponse {
    const usuarioResponse = new UsuarioResponse();
    usuarioResponse.idUsuario = usuario.idUsuario;
    usuarioResponse.firstName = usuario.firstName;
    usuarioResponse.lastName = usuario.lastName;
    usuarioResponse.username = usuario.username;
    usuarioResponse.email = usuario.email;
    usuarioResponse.nomeCompleto = `${usuario.firstName} ${usuario.lastName}`;
    usuarioResponse.statusValidacao = usuario.statusValidacao;

    // HATEOAS Links
    const baseUrl = ROTA.USUARIO.BASE;
    usuarioResponse._links = {
      self: { href: `${baseUrl}/buscar/${usuario.idUsuario}`, method: 'GET' },
      update: { href: `${baseUrl}/alterar/${usuario.idUsuario}`, method: 'PUT' },
      delete: { href: `${baseUrl}/excluir/${usuario.idUsuario}`, method: 'DELETE' },
    };

    return usuarioResponse;
  }

  static toListUsuarioResponse(usuarios: Usuario[]): UsuarioResponse[] {
    return usuarios.map((usuario) => this.toUsuarioResponse(usuario));
  }
}
