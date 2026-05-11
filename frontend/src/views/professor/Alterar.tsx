import { useEffect, useState, type FormEvent } from 'react';
import { MdCancel } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetProfessorById, apiUpdateProfessor } from '../../services/professor/api/api.professor';
import { PROFESSOR } from '../../services/professor/constants/professor.constants';
import type { Professor } from '../../services/professor/type/Professor';
import { ROTA } from '../../services/router/url';
import { apiGetUsuarios } from '../../services/usuario/api/api.usuario';
import type { Usuario } from '../../services/usuario/type/Usuario';

export default function AlterarProfessor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professor, setProfessor] = useState<Professor>({
    codProfessor: '',
    nomeProfessor: '',
    idUsuario: 0,
  });
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [usersResponse, profResponse] = await Promise.all([
          apiGetUsuarios({ pageSize: 1000 }),
          apiGetProfessorById(Number(id)),
        ]);
        
        if (usersResponse.data && usersResponse.data.dados) {
          setUsuarios(usersResponse.data.dados.content);
        }
        
        if (profResponse.data && profResponse.data.dados) {
          setProfessor(profResponse.data.dados);
        }
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadData();
  }, [id]);

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
      await apiUpdateProfessor(Number(id), professor);
      navigate(ROTA.PROFESSOR.LISTAR);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{PROFESSOR.TITULO.ATUALIZAR}</h2>
        {loading ? (
          <p>Carregando dados...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-2 mt-4">
              <label htmlFor="codProfessor" className="app-label">
                Código:
              </label>
              <input
                id="codProfessor"
                type="text"
                name="codProfessor"
                value={professor.codProfessor}
                onChange={handleChange}
                className="form-control app-label mt-2"
                required
              />
            </div>
            <div className="mb-2 mt-4">
              <label htmlFor="nomeProfessor" className="app-label">
                Nome:
              </label>
              <input
                id="nomeProfessor"
                type="text"
                name="nomeProfessor"
                value={professor.nomeProfessor}
                onChange={handleChange}
                className="form-control app-label mt-2"
                required
              />
            </div>
            <div className="mb-2 mt-4">
              <label htmlFor="idUsuario" className="app-label">
                Usuário Vinculado:
              </label>
              <select
                id="idUsuario"
                name="idUsuario"
                value={professor.idUsuario}
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
                onClick={() => navigate(ROTA.PROFESSOR.LISTAR)}
                title="Cancelar a Edição"
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
                className="btn btn-edit"
                title="Salvar alterações"
              >
                <span className="btn-icon">
                  <i>
                    <BsPencilSquare />
                  </i>
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
