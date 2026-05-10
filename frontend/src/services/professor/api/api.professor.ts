import { http } from '../../axios/config.axios';
import { ROTA } from '../../router/url';
import type { Professor } from '../type/Professor';

export interface SearchParams {
  page?: number;
  pageSize?: number;
  props?: string;
  order?: string;
  searchTerm?: string | null;
}

export const apiGetProfessor = async (params: SearchParams) => {
  const response = await http.get(ROTA.PROFESSOR.LISTAR, { params });
  return response;
};

export const apiCreateProfessor = async (data: Professor) => {
  const response = await http.post(ROTA.PROFESSOR.CRIAR, data);
  return response;
};

export const apiGetProfessorById = async (id: number | string) => {
  const response = await http.get(`${ROTA.PROFESSOR.POR_ID}/${id}`);
  return response;
};

export const apiUpdateProfessor = async (id: number | string, data: Partial<Professor>) => {
  const response = await http.put(`${ROTA.PROFESSOR.ATUALIZAR}/${id}`, data);
  return response;
};

export const apiDeleteProfessor = async (id: number | string) => {
  const response = await http.delete(`${ROTA.PROFESSOR.EXCLUIR}/${id}`);
  return response;
};
