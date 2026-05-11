import { useEffect, useState, type FormEvent } from 'react';
import { MdCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { apiCreateDisciplina } from '../../services/disciplina/api/api.disciplina';
import { DISCIPLINA } from '../../services/disciplina/constants/disciplina.constants';
import type { Disciplina } from '../../services/disciplina/type/Disciplina';
import { ROTA } from '../../services/router/url';
import { apiGetProfessor } from '../../services/professor/api/api.professor';
import type { Professor } from '../../services/professor/type/Professor';

export default function CriarDisciplina() {
  const navigate = useNavigate();
  const [disciplina, setDisciplina] = useState<Disciplina>({
    nomeDisciplina: '',
    periodo: 1,
    idProfessor: 0,
  });
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfessores() {
      try {
        const response = await apiGetProfessor({ pageSize: 1000 });
        if (response.data && response.data.dados) {
          setProfessores(response.data.dados.content);
        }
      } catch (error) {
        console.error('Erro ao buscar professores', error);
      } finally {
        setLoading(false);
      }
    }
    loadProfessores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDisciplina((prev) => ({
      ...prev,
      [name]: name === 'idProfessor' || name === 'periodo' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (disciplina.idProfessor === 0) {
      alert('Por favor, selecione um professor.');
      return;
    }
    try {
      await apiCreateDisciplina(disciplina);
      navigate(ROTA.DISCIPLINA.LISTAR);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>{DISCIPLINA.TITULO.CRIAR}</h2>
        {loading ? (
          <p>Carregando dados...</p>
        ) : (
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
                    <FaPlus />
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
