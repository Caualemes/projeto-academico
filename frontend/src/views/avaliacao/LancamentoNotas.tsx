import { useEffect, useState } from 'react';
import { apiGetDisciplinas } from '../../services/disciplina/api/api.disciplina';
import type { Disciplina } from '../../services/disciplina/type/Disciplina';
import { apiGetAvaliacoes } from '../../services/avaliacao/api/api.avaliacao';
import type { Avaliacao } from '../../services/avaliacao/type/Avaliacao';
import { apiGetAlunosPorDisciplina } from '../../services/matricula/api/api.matricula';
import { apiLancarNota, apiGetNotasPorAvaliacao } from '../../services/notas/api/api.notas';

export default function LancamentoNotas() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [alunos, setAlunos] = useState<any[]>([]);
  const [notas, setNotas] = useState<Record<number, number>>({});
  
  const [selectedDisciplina, setSelectedDisciplina] = useState<number>(0);
  const [selectedAvaliacao, setSelectedAvaliacao] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDisciplinas() {
      try {
        const resp = await apiGetDisciplinas({ pageSize: 1000 });
        if (resp.data && resp.data.dados) setDisciplinas(resp.data.dados.content);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadDisciplinas();
  }, []);

  useEffect(() => {
    if (selectedDisciplina > 0) {
      async function loadAvaliacoesAndAlunos() {
        try {
          const [avalResp, alunoResp] = await Promise.all([
            apiGetAvaliacoes({ disciplinaId: selectedDisciplina as any, pageSize: 1000 }),
            apiGetAlunosPorDisciplina(selectedDisciplina)
          ]);
          if (avalResp.data && avalResp.data.dados) setAvaliacoes(avalResp.data.dados.content);
          if (alunoResp.data && alunoResp.data.dados) setAlunos(alunoResp.data.dados);
        } catch (error) {
          console.error(error);
        }
      }
      loadAvaliacoesAndAlunos();
      setSelectedAvaliacao(0);
      setAlunos([]);
      setNotas({});
    } else {
      setAvaliacoes([]);
      setAlunos([]);
    }
  }, [selectedDisciplina]);

  useEffect(() => {
    if (selectedAvaliacao > 0) {
      async function loadNotas() {
        try {
          const resp = await apiGetNotasPorAvaliacao(selectedAvaliacao);
          if (resp.data && resp.data.dados) {
            const notasMap: Record<number, number> = {};
            resp.data.dados.forEach((n: any) => {
              notasMap[n.alunoId] = n.nota;
            });
            setNotas(notasMap);
          }
        } catch (error) {
          console.error(error);
        }
      }
      loadNotas();
    }
  }, [selectedAvaliacao]);

  const handleNotaChange = (alunoId: number, value: string) => {
    const numValue = parseFloat(value);
    setNotas({ ...notas, [alunoId]: numValue });
  };

  const handleSaveNota = async (alunoId: number) => {
    if (selectedAvaliacao === 0) return;
    const nota = notas[alunoId];
    if (nota === undefined || isNaN(nota)) {
      alert('Informe uma nota válida.');
      return;
    }
    try {
      await apiLancarNota({
        alunoId,
        avaliacaoId: selectedAvaliacao,
        nota
      });
      alert('Nota salva com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar nota.');
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Lançamento de Notas</h2>
        
        <div style={{ display: 'flex', gap: '20px' }} className="mt-4">
          <div style={{ flex: 1 }}>
            <label className="app-label">Disciplina:</label>
            <select
              className="form-control app-label mt-2"
              value={selectedDisciplina}
              onChange={(e) => setSelectedDisciplina(Number(e.target.value))}
            >
              <option value={0}>Selecione...</option>
              {disciplinas.map((d) => (
                <option key={d.idDisciplina} value={d.idDisciplina}>
                  {d.nomeDisciplina}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label className="app-label">Avaliação:</label>
            <select
              className="form-control app-label mt-2"
              value={selectedAvaliacao}
              onChange={(e) => setSelectedAvaliacao(Number(e.target.value))}
              disabled={selectedDisciplina === 0}
            >
              <option value={0}>Selecione...</option>
              {avaliacoes.map((a) => (
                <option key={a.idAvaliacao} value={a.idAvaliacao}>
                  {a.descricao}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr className="mt-4" />

        <h3 className="mt-4">Alunos Matriculados</h3>
        <table className="mt-3">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="center">Nota</th>
              <th className="center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {alunos.length === 0 ? (
              <tr><td colSpan={3} className="center">Selecione uma disciplina com alunos matriculados.</td></tr>
            ) : (
              alunos.map((item) => {
                const alunoId = item.alunoId || item.idAluno;
                const alunoNome = item.aluno?.nomeAluno || item.nomeAluno || 'Aluno ' + alunoId;
                return (
                  <tr key={alunoId}>
                    <td>{alunoNome}</td>
                    <td className="center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        className="form-control text-center"
                        style={{ width: '80px', margin: '0 auto' }}
                        value={notas[alunoId] ?? ''}
                        onChange={(e) => handleNotaChange(alunoId, e.target.value)}
                        disabled={selectedAvaliacao === 0}
                      />
                    </td>
                    <td className="center">
                      <button
                        className="btn btn-add"
                        style={{ padding: '5px 15px' }}
                        onClick={() => handleSaveNota(alunoId)}
                        disabled={selectedAvaliacao === 0}
                      >
                        Salvar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
