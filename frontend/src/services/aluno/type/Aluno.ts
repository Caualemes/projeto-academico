import type { Usuario } from '../../usuario/type/Usuario';

export interface Aluno {
  idAluno?: number;
  codAluno: string;
  nomeAluno: string;
  idade?: number;
  idUsuario: number;
  usuario?: Usuario;
}
