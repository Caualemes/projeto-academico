import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";
import type { Avaliacao } from "../type/Avaliacao";

export interface SearchParams {
  page?: number;
  pageSize?: number;
  props?: string;
  order?: string;
  searchTerm?: string | null;
}

export const apiGetAvaliacoes = async (params: SearchParams) => {
  return await http.get(ROTA.AVALIACAO.LISTAR, { params });
};

export const apiGetAvaliacaoById = async (id: number | string) => {
  return await http.get(`${ROTA.AVALIACAO.POR_ID}/${id}`);
};

export const apiCreateAvaliacao = async (data: Avaliacao) => {
  return await http.post(ROTA.AVALIACAO.CRIAR, data);
};

export const apiUpdateAvaliacao = async (id: number | string, data: Avaliacao) => {
  return await http.put(`${ROTA.AVALIACAO.ATUALIZAR}/${id}`, data);
};

export const apiDeleteAvaliacao = async (id: number | string) => {
  return await http.delete(`${ROTA.AVALIACAO.EXCLUIR}/${id}`);
};
