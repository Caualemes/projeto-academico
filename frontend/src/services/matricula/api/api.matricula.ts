import { http } from "../../axios/config.axios";

export const apiMatricularAluno = async (data: { alunoId: number, disciplinaId: number }) => {
  return await http.post('/sistema/matricula/matricular', data);
};

export const apiGetAlunosPorDisciplina = async (disciplinaId: number) => {
  return await http.get(`/sistema/matricula/disciplina/${disciplinaId}`);
};

export const apiAlterarStatusMatricula = async (data: { alunoId: number, disciplinaId: number, status: string }) => {
  return await http.put('/sistema/matricula/status', data);
};
