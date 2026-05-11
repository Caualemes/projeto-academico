import { http } from '../../axios/config.axios';
import { ROTA } from '../../router/url';
import type { Aluno } from '../type/Aluno';

export interface SearchParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string | null;
  props?: string;
  order?: string;
}

export const apiGetAlunos = (params: SearchParams) => {
  return http.get(ROTA.ALUNO.LISTAR, { params });
};

export const apiGetAlunoById = (id: number | string) => {
  return http.get(`${ROTA.ALUNO.POR_ID}/${id}`);
};

export const apiCreateAluno = (aluno: Aluno) => {
  return http.post(ROTA.ALUNO.CRIAR, aluno);
};

export const apiUpdateAluno = (id: number | string, aluno: Partial<Aluno>) => {
  return http.put(`${ROTA.ALUNO.ATUALIZAR}/${id}`, aluno);
};

export const apiDeleteAluno = (id: number | string) => {
  return http.delete(`${ROTA.ALUNO.EXCLUIR}/${id}`);
};
