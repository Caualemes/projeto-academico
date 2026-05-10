import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCreateProfessor } from '../../services/professor/api/api.professor';
import { PROFESSOR } from '../../services/professor/constants/professor.constants';
import type { Professor } from '../../services/professor/type/Professor';
import { ROTA } from '../../services/router/url';
import { apiGetUsuarios } from '../../services/usuario/api/api.usuario';
import type { Usuario } from '../../services/usuario/type/Usuario';

export default function CriarProfessor() {
  const navigate = useNavigate();
  const [professor, setProfessor] = useState<Professor>({
    codProfessor: '',
    nomeProfessor: '',
    idUsuario: 0,
  });
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsuarios() {
      try {
        const response = await apiGetUsuarios({ pageSize: 1000 }); // get all users
        if (response.data && response.data.dados) {
          setUsuarios(response.data.dados.content);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      } finally {
        setLoading(false);
      }
    }
    loadUsuarios();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfessor((prev) => ({
      ...prev,
      [name]: name === 'idUsuario' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (professor.idUsuario === 0) {
      alert('Por favor, selecione um usuário.');
      return;
    }
    try {
      await apiCreateProfessor(professor);
      navigate(ROTA.PROFESSOR.LISTAR);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{PROFESSOR.TITULO.NOVO}</h2>
        {loading ? (
          <p>Carregando usuários...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Código:</label>
              <input
                type="text"
                name="codProfessor"
                value={professor.codProfessor}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                name="nomeProfessor"
                value={professor.nomeProfessor}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Usuário Vinculado:</label>
              <select
                name="idUsuario"
                value={professor.idUsuario}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value={0}>Selecione um usuário...</option>
                {usuarios.map((user) => (
                  <option key={user.idUsuario} value={user.idUsuario}>
                    {user.firstName} {user.lastName} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-add">
                Salvar
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
