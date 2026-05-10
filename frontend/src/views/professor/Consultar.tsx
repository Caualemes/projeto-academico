import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetProfessorById } from '../../services/professor/api/api.professor';
import { PROFESSOR } from '../../services/professor/constants/professor.constants';
import type { Professor } from '../../services/professor/type/Professor';
import { ROTA } from '../../services/router/url';

export default function ConsultarProfessor() {
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

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{PROFESSOR.TITULO.CONSULTAR}</h2>
        {loading || !professor ? (
          <p>Carregando dados...</p>
        ) : (
          <div>
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
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-default"
                onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}
              >
                Voltar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
