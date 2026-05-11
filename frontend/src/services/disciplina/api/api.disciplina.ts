import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";
import type { Disciplina } from "../type/Disciplina";

export interface SearchParams {
  page?: number;
  pageSize?: number;
  props?: string;
  order?: string;
  searchTerm?: string | null;
}

export const apiGetDisciplinas = async (params: SearchParams) => {
  return await http.get(ROTA.DISCIPLINA.LISTAR, { params });
};

export const apiGetDisciplinaById = async (id: number | string) => {
  return await http.get(`${ROTA.DISCIPLINA.POR_ID}/${id}`);
};

export const apiCreateDisciplina = async (data: Disciplina) => {
  return await http.post(ROTA.DISCIPLINA.CRIAR, data);
};

export const apiUpdateDisciplina = async (id: number | string, data: Disciplina) => {
  return await http.put(`${ROTA.DISCIPLINA.ATUALIZAR}/${id}`, data);
};

export const apiDeleteDisciplina = async (id: number | string) => {
  return await http.delete(`${ROTA.DISCIPLINA.EXCLUIR}/${id}`);
};
