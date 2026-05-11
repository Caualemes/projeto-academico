import { Expose } from 'class-transformer';
import { Link } from '../mensagem/mensagem';

export class BaseResponse {
  @Expose()
  _links?: Record<string, Link>;
}
