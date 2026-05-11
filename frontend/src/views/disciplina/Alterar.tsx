import { useEffect, useState, type FormEvent } from 'react';
import { MdCancel, MdDelete } from "react-icons/md";
import { FaSave, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetDisciplinaById, apiUpdateDisciplina } from '../../services/disciplina/api/api.disciplina';
import { DISCIPLINA } from '../../services/disciplina/constants/disciplina.constants';
import type { Disciplina } from '../../services/disciplina/type/Disciplina';
import { ROTA } from '../../services/router/url';
import { apiGetProfessor } from '../../services/professor/api/api.professor';
import type { Professor } from '../../services/professor/type/Professor';
import { apiGetAvaliacoes, apiCreateAvaliacao, apiDeleteAvaliacao } from '../../services/avaliacao/api/api.avaliacao';
import type { Avaliacao } from '../../services/avaliacao/type/Avaliacao';

export default function AlterarDisciplina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disciplina, setDisciplina] = useState<Disciplina | null>(null);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [newAvaliacaoDesc, setNewAvaliacaoDesc] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [profResponse, discResponse, avalResponse] = await Promise.all([
        apiGetProfessor({ pageSize: 1000 }),
        apiGetDisciplinaById(Number(id)),
        apiGetAvaliacoes({ disciplinaId: Number(id) as any, pageSize: 1000 })
      ]);

      if (profResponse.data && profResponse.data.dados) {
        setProfessores(profResponse.data.dados.content);
      }

      if (discResponse.data && discResponse.data.dados) {
        setDisciplina(discResponse.data.dados);
      }

      if (avalResponse.data && avalResponse.data.dados) {
        setAvaliacoes(avalResponse.data.dados.content);
      }
    } catch (error) {
      console.error('Erro ao buscar dados', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!disciplina) return;
    setDisciplina({
      ...disciplina,
      [name]: name === 'idProfessor' || name === 'periodo' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!disciplina || disciplina.idProfessor === 0) {
      alert('Por favor, selecione um professor.');
      return;
    }
    try {
      await apiUpdateDisciplina(Number(id), disciplina);
      navigate(ROTA.DISCIPLINA.LISTAR);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAvaliacao = async (e: FormEvent) => {
    e.preventDefault();
    if (!newAvaliacaoDesc.trim()) return;
    try {
      await apiCreateAvaliacao({
        descricao: newAvaliacaoDesc,
        disciplinaId: Number(id)
      });
      setNewAvaliacaoDesc('');
      loadData(); // Reload list
    } catch (error) {
      console.error('Erro ao criar avaliação', error);
    }
  };

  const handleDeleteAvaliacao = async (avalId: number) => {
    if (!window.confirm('Excluir esta avaliação?')) return;
    try {
      await apiDeleteAvaliacao(avalId);
      loadData();
    } catch (error) {
      console.error('Erro ao excluir avaliação', error);
    }
  };

  if (loading) return <div className="display"><div className="card">Carregando...</div></div>;
  if (!disciplina) return <div className="display"><div className="card">Disciplina não encontrada.</div></div>;

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{DISCIPLINA.TITULO.ALTERAR}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 mt-4">
            <label htmlFor="nomeDisciplina" className="app-label">
              {DISCIPLINA.LABEL.NOME}:
            </label>
            <input
              id="nomeDisciplina"
              type="text"
              name="nomeDisciplina"
              value={disciplina.nomeDisciplina}
              onChange={handleChange}
              className="form-control app-label mt-2"
              required
            />
          </div>
          
          <div className="mb-2 mt-4">
            <label htmlFor="periodo" className="app-label">
              {DISCIPLINA.LABEL.PERIODO}:
            </label>
            <input
              id="periodo"
              type="number"
              name="periodo"
              min={1}
              max={12}
              value={disciplina.periodo}
              onChange={handleChange}
              className="form-control app-label mt-2"
              required
            />
          </div>

          <div className="mb-2 mt-4">
            <label htmlFor="idProfessor" className="app-label">
              {DISCIPLINA.LABEL.PROFESSOR}:
            </label>
            <select
              id="idProfessor"
              name="idProfessor"
              value={disciplina.idProfessor}
              onChange={handleChange}
              required
              className="form-control app-label mt-2"
            >
              <option value={0}>Selecione um professor...</option>
              {professores.map((prof) => (
                <option key={prof.idProfessor} value={prof.idProfessor}>
                  {prof.nomeProfessor} ({prof.codProfessor})
                </option>
              ))}
            </select>
          </div>

          <div className="btn-content mt-4">
            <button
              id="cancel"
              type="button"
              className="btn btn-cancel"
              onClick={() => navigate(ROTA.DISCIPLINA.LISTAR)}
              title="Cancelar"
            >
              <span className="btn-icon">
                <i>
                  <MdCancel />
                </i>
              </span>
              Cancelar
            </button>
            <button
              id="submit"
              type="submit"
              className="btn btn-add"
              title="Salvar"
            >
              <span className="btn-icon">
                <i>
                  <FaSave />
                </i>
              </span>
              Salvar
            </button>
          </div>
        </form>

        <hr className="mt-5 mb-4" />

        <div className="evaluations-section">
          <h3>Avaliações</h3>
          
          <form onSubmit={handleAddAvaliacao} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Descrição da avaliação (ex: P1, Trabalho...)"
              value={newAvaliacaoDesc}
              onChange={(e) => setNewAvaliacaoDesc(e.target.value)}
              className="form-control app-label"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-add" style={{ padding: '8px 15px' }}>
              <FaPlus /> Adicionar
            </button>
          </form>

          <table className="mt-4">
            <thead>
              <tr>
                <th>Descrição</th>
                <th className="center actions">Ação</th>
              </tr>
            </thead>
            <tbody>
              {avaliacoes.length === 0 ? (
                <tr><td colSpan={2} className="center">Nenhuma avaliação cadastrada.</td></tr>
              ) : (
                avaliacoes.map((aval) => (
                  <tr key={aval.idAvaliacao}>
                    <td>{aval.descricao}</td>
                    <td className="center actions">
                      <button 
                        onClick={() => handleDeleteAvaliacao(aval.idAvaliacao!)}
                        className="btn-minimal text-danger"
                        title="Excluir Avaliação"
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
