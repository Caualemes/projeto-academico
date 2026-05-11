import { useEffect, useState } from 'react';
import { MdCancel } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetDisciplinaById, apiDeleteDisciplina } from '../../services/disciplina/api/api.disciplina';
import { DISCIPLINA } from '../../services/disciplina/constants/disciplina.constants';
import type { Disciplina } from '../../services/disciplina/type/Disciplina';
import { ROTA } from '../../services/router/url';

export default function ExcluirDisciplina() {
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

  const handleDelete = async () => {
    try {
      await apiDeleteDisciplina(Number(id));
      navigate(ROTA.DISCIPLINA.LISTAR);
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir disciplina.');
    }
  };

  if (loading) return <div className="display"><div className="card">Carregando...</div></div>;
  if (!disciplina) return <div className="display"><div className="card">Disciplina não encontrada.</div></div>;

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2 className="text-danger">{DISCIPLINA.TITULO.EXCLUIR}</h2>
        <p className="mt-4">Tem certeza que deseja excluir a disciplina <b>{disciplina.nomeDisciplina}</b>?</p>
        
        <div className="btn-content mt-4">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => navigate(ROTA.DISCIPLINA.LISTAR)}
          >
            <span className="btn-icon">
              <i><MdCancel /></i>
            </span>
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-logout"
            onClick={handleDelete}
            style={{ backgroundColor: '#e74c3c' }}
          >
            <span className="btn-icon">
              <i><FaTrash /></i>
            </span>
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </div>
  );
}
