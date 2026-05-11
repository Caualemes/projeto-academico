import { BaseResponse } from '../../../commons/dto/base.response';

export class UsuarioResponse extends BaseResponse {
  idUsuario?: number;
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  email: string = '';
  nomeCompleto: string = '';
  statusValidacao?: boolean;
}
