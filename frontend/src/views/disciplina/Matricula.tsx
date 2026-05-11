import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetDisciplinas } from '../../services/disciplina/api/api.disciplina';
import type { Disciplina } from '../../services/disciplina/type/Disciplina';
import { apiGetAlunos } from '../../services/aluno/api/api.aluno';
import type { Aluno } from '../../services/aluno/type/Aluno';
import { apiMatricularAluno, apiGetAlunosPorDisciplina } from '../../services/matricula/api/api.matricula';

export default function Matricula() {
  const navigate = useNavigate();
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [selectedDisciplina, setSelectedDisciplina] = useState<number>(0);
  const [matriculadosIds, setMatriculadosIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [discResp, alunoResp] = await Promise.all([
          apiGetDisciplinas({ pageSize: 1000 }),
          apiGetAlunos({ pageSize: 1000 })
        ]);
        if (discResp.data && discResp.data.dados) setDisciplinas(discResp.data.dados.content);
        if (alunoResp.data && alunoResp.data.dados) setAlunos(alunoResp.data.dados.content);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedDisciplina > 0) {
      async function loadMatriculados() {
        try {
          const resp = await apiGetAlunosPorDisciplina(selectedDisciplina);
          if (resp.data && resp.data.dados) {
            // Assume dados is an array of AlunoDisciplina objects or Aluno objects
            const ids = resp.data.dados.map((item: any) => item.alunoId || item.idAluno);
            setMatriculadosIds(ids);
          }
        } catch (error) {
          console.error(error);
        }
      }
      loadMatriculados();
    } else {
      setMatriculadosIds([]);
    }
  }, [selectedDisciplina]);

  const handleToggleMatricula = async (alunoId: number) => {
    if (selectedDisciplina === 0) {
      alert('Selecione uma disciplina primeiro.');
      return;
    }

    const isEnrolled = matriculadosIds.includes(alunoId);
    
    if (isEnrolled) {
      // In a real system we might have an unenroll endpoint. 
      // For now, let's assume we can just re-enroll or the backend handles it.
      // Or maybe we use the 'status' to Deactivate?
      alert('Aluno já matriculado. Implementar desmatrícula se necessário.');
    } else {
      try {
        await apiMatricularAluno({
          alunoId,
          disciplinaId: selectedDisciplina
        });
        setMatriculadosIds([...matriculadosIds, alunoId]);
      } catch (error) {
        console.error(error);
        alert('Erro ao matricular aluno.');
      }
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Matrícula de Alunos</h2>
        
        <div className="mb-4 mt-4">
          <label className="app-label">Selecione a Disciplina:</label>
          <select
            className="form-control app-label mt-2"
            value={selectedDisciplina}
            onChange={(e) => setSelectedDisciplina(Number(e.target.value))}
          >
            <option value={0}>Selecione...</option>
            {disciplinas.map((d) => (
              <option key={d.idDisciplina} value={d.idDisciplina}>
                {d.nomeDisciplina} ({d.periodo}º Período)
              </option>
            ))}
          </select>
        </div>

        <hr />

        <h3 className="mt-4">Lista de Alunos</h3>
        <table className="mt-3">
          <thead>
            <tr>
              <th>Nome</th>
              <th>RA / Código</th>
              <th className="center">Status</th>
              <th className="center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => {
              const isEnrolled = matriculadosIds.includes(aluno.idAluno!);
              return (
                <tr key={aluno.idAluno}>
                  <td>{aluno.nomeAluno}</td>
                  <td>{aluno.ra}</td>
                  <td className="center">
                    {isEnrolled ? (
                      <span className="badge bg-success">Matriculado</span>
                    ) : (
                      <span className="badge bg-secondary">Não Matriculado</span>
                    )}
                  </td>
                  <td className="center">
                    {!isEnrolled && (
                      <button
                        className="btn btn-add"
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        onClick={() => handleToggleMatricula(aluno.idAluno!)}
                      >
                        Matricular
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
