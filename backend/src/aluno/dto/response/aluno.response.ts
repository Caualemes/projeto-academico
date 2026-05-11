import { UsuarioResponse } from '../../../usuario/dto/response/usuario.response';
import { BaseResponse } from '../../../commons/dto/base.response';

export class AlunoResponse extends BaseResponse {
  idAluno?: number;
  codAluno: string = '';
  nomeAluno?: string;
  idade?: number;
  idUsuario!: number;
  usuario?: UsuarioResponse;
}
