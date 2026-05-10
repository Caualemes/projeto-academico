import { http } from '../../axios/config.axios';
import { ROTA } from '../../router/url';
import type { Usuario } from '../type/Usuario';

export interface SearchParams {
  page?: number;
  pageSize?: number;
  props?: string;
  order?: string;
  search?: string;
}

export const apiGetUsuarios = async (params: SearchParams) => {
  const response = await http.get(ROTA.USUARIO.LISTAR, {
    params,
  });
  return response;
};

export const apiPostUsuario = async (usuario: Usuario) => {
  const response = await http.post(ROTA.USUARIO.CRIAR, usuario);
  return response;
};

export const apiGetUsuarioById = async (id: number | string) => {
  const response = await http.get(`${ROTA.USUARIO.POR_ID}/${id}`);
  return response;
};

export const apiUpdateUsuario = async (id: number | string, usuario: Partial<Usuario>) => {
  const response = await http.put(`${ROTA.USUARIO.ATUALIZAR}/${id}`, usuario);
  return response;
};

export const apiDeleteUsuario = async (id: number | string) => {
  const response = await http.delete(`${ROTA.USUARIO.EXCLUIR}/${id}`);
  return response;
};
