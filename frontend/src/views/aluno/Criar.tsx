import { useEffect, useState, type FormEvent } from 'react';
import { MdCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { apiCreateAluno } from '../../services/aluno/api/api.aluno';
import { ALUNO } from '../../services/aluno/constants/aluno.constants';
import type { Aluno } from '../../services/aluno/type/Aluno';
import { ROTA } from '../../services/router/url';
import { apiGetUsuarios } from '../../services/usuario/api/api.usuario';
import type { Usuario } from '../../services/usuario/type/Usuario';

export default function CriarAluno() {
  const navigate = useNavigate();
  const [aluno, setAluno] = useState<Aluno>({
    codAluno: '',
    nomeAluno: '',
    idade: 0,
    idUsuario: 0,
  });
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsuarios() {
      try {
        const response = await apiGetUsuarios({ pageSize: 1000 });
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
    setAluno((prev) => ({
      ...prev,
      [name]: (name === 'idUsuario' || name === 'idade') ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (aluno.idUsuario === 0) {
      alert('Por favor, selecione um usuário.');
      return;
    }
    try {
      await apiCreateAluno(aluno);
      navigate(ROTA.ALUNO.LISTAR);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{ALUNO.TITULO.NOVO}</h2>
        {loading ? (
          <p>Carregando usuários...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-2 mt-4">
              <label htmlFor="codAluno" className="app-label">Código:</label>
              <input
                id="codAluno"
                type="text"
                name="codAluno"
                value={aluno.codAluno}
                onChange={handleChange}
                className="form-control app-label mt-2"
                required
              />
            </div>
            <div className="mb-2 mt-4">
              <label htmlFor="nomeAluno" className="app-label">Nome:</label>
              <input
                id="nomeAluno"
                type="text"
                name="nomeAluno"
                value={aluno.nomeAluno}
                onChange={handleChange}
                className="form-control app-label mt-2"
                required
              />
            </div>
            <div className="mb-2 mt-4">
              <label htmlFor="idade" className="app-label">Idade:</label>
              <input
                id="idade"
                type="number"
                name="idade"
                value={aluno.idade || ''}
                onChange={handleChange}
                className="form-control app-label mt-2"
                required
              />
            </div>
            <div className="mb-2 mt-4">
              <label htmlFor="idUsuario" className="app-label">Usuário Vinculado:</label>
              <select
                id="idUsuario"
                name="idUsuario"
                value={aluno.idUsuario}
                onChange={handleChange}
                required
                className="form-control app-label mt-2"
              >
                <option value={0}>Selecione um usuário...</option>
                {usuarios.map((user) => (
                  <option key={user.idUsuario} value={user.idUsuario}>
                    {user.firstName} {user.lastName} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="btn-content mt-4">
              <button
                id="cancel"
                type="button"
                className="btn btn-cancel"
                onClick={() => navigate(ROTA.ALUNO.LISTAR)}
                title="Cancelar a Edição"
              >
                <span className="btn-icon">
                  <i><MdCancel /></i>
                </span>
                Cancelar
              </button>
              <button
                id="submit"
                type="submit"
                className="btn btn-add"
                title="Salvar alterações"
              >
                <span className="btn-icon">
                  <i><FaPlus /></i>
                </span>
                Salvar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
