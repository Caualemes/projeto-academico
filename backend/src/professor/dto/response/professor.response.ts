import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PROFESSOR } from '../../constants/professor.constants';

export class ProfessorResponse {
  @ApiProperty({ description: PROFESSOR.SWAGGER.ID_PROFESSOR, example: '1' })
  @Expose()
  idProfessor?: number;

  @ApiProperty({ description: PROFESSOR.SWAGGER.COD_PROFESSOR, example: 'P001' })
  @Expose()
  codProfessor: string = '';

  @ApiProperty({ description: PROFESSOR.SWAGGER.NOME_PROFESSOR, example: 'João Silva' })
  @Expose()
  nomeProfessor: string = '';

  @ApiProperty({ description: PROFESSOR.SWAGGER.ID_USUARIO, example: '2' })
  @Expose()
  idUsuario!: number;

  @Expose()
  usuarioNome?: string;
}
