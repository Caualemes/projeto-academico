import { useEffect, useState } from 'react';
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetDisciplinaById } from '../../services/disciplina/api/api.disciplina';
import { DISCIPLINA } from '../../services/disciplina/constants/disciplina.constants';
import type { Disciplina } from '../../services/disciplina/type/Disciplina';
import { ROTA } from '../../services/router/url';

export default function ConsultarDisciplina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disciplina, setDisciplina] = useState<Disciplina | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await apiGetDisciplinaById(Number(id));
        if (response.data && response.data.dados) {
          setDisciplina(response.data.dados);
        }
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) return <div className="display"><div className="card">Carregando...</div></div>;
  if (!disciplina) return <div className="display"><div className="card">Disciplina não encontrada.</div></div>;

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{DISCIPLINA.TITULO.CONSULTAR}</h2>
        <div className="mb-2 mt-4">
          <label className="app-label">ID:</label>
          <div className="form-control-static mt-1">{disciplina.idDisciplina}</div>
        </div>
        <div className="mb-2 mt-4">
          <label className="app-label">{DISCIPLINA.LABEL.NOME}:</label>
          <div className="form-control-static mt-1">{disciplina.nomeDisciplina}</div>
        </div>
        <div className="mb-2 mt-4">
          <label className="app-label">{DISCIPLINA.LABEL.PERIODO}:</label>
          <div className="form-control-static mt-1">{disciplina.periodo}º Período</div>
        </div>
        <div className="mb-2 mt-4">
          <label className="app-label">{DISCIPLINA.LABEL.PROFESSOR}:</label>
          <div className="form-control-static mt-1">{disciplina.professor?.nomeProfessor || 'N/A'}</div>
        </div>

        <div className="btn-content mt-4">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => navigate(ROTA.DISCIPLINA.LISTAR)}
          >
            <span className="btn-icon">
              <i><MdArrowBack /></i>
            </span>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
