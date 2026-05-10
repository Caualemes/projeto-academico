import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiDeleteProfessor, apiGetProfessorById } from '../../services/professor/api/api.professor';
import { PROFESSOR } from '../../services/professor/constants/professor.constants';
import type { Professor } from '../../services/professor/type/Professor';
import { ROTA } from '../../services/router/url';

export default function ExcluirProfessor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await apiGetProfessorById(Number(id));
        if (response.data && response.data.dados) {
          setProfessor(response.data.dados);
        }
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadData();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await apiDeleteProfessor(Number(id));
      navigate(ROTA.PROFESSOR.LISTAR);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{PROFESSOR.TITULO.EXCLUIR}</h2>
        {loading || !professor ? (
          <p>Carregando dados...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Código:</label>
              <input type="text" value={professor.codProfessor} readOnly />
            </div>
            <div className="form-group">
              <label>Nome:</label>
              <input type="text" value={professor.nomeProfessor} readOnly />
            </div>
            <div className="form-group">
              <label>Usuário Vinculado:</label>
              <input
                type="text"
                value={professor.usuarioNome ? `${professor.usuarioNome} (ID: ${professor.idUsuario})` : professor.idUsuario}
                readOnly
              />
            </div>
            
            <p style={{ color: 'red', fontWeight: 'bold', marginTop: '15px' }}>
              Tem certeza que deseja excluir este professor? Esta ação não poderá ser desfeita.
            </p>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-default"
                onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-danger">
                Excluir
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
