import { http } from "../../axios/config.axios";

export interface LancarNotaDto {
  alunoId: number;
  avaliacaoId: number;
  nota: number;
}

export const apiLancarNota = async (data: LancarNotaDto) => {
  return await http.post('/sistema/notas/lancar', data);
};

export const apiGetNotasPorAvaliacao = async (avaliacaoId: number) => {
  return await http.get(`/sistema/notas/avaliacao/${avaliacaoId}`);
};
