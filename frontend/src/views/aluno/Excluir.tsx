import { useEffect, useState, type FormEvent } from "react";
import { MdCancel } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { apiDeleteAluno, apiGetAlunoById } from "../../services/aluno/api/api.aluno";
import type { Aluno } from "../../services/aluno/type/Aluno";
import { ROTA } from "../../services/router/url";

export default function ExcluirAluno() {
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<Aluno | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAluno() {
      try {
        if (id) {
          const response = await apiGetAlunoById(id);
          if (response.data.dados) {
            setModel(response.data.dados);
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    }
    getAluno();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await apiDeleteAluno(id);
      navigate(ROTA.ALUNO.LISTAR);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Excluir Aluno</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 mt-4">
            <label htmlFor="codAluno" className="app-label">Código:</label>
            <input
              id="codAluno"
              name="codAluno"
              value={model?.codAluno || ""}
              className={getInputClass()}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="nomeAluno" className="app-label">Nome:</label>
            <input
              id="nomeAluno"
              name="nomeAluno"
              value={model?.nomeAluno || ""}
              className={getInputClass()}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div className="btn-content mt-4">
            <button
              id="cancel"
              type="button"
              className="btn btn-cancel"
              onClick={() => navigate(ROTA.ALUNO.LISTAR)}
              title="Cancelar a Exclusão"
            >
              <span className="btn-icon">
                <i><MdCancel /></i>
              </span>
              Cancelar
            </button>
            <button
              id="submit"
              type="submit"
              className="btn btn-delete"
              title="Confirmar exclusão"
            >
              <span className="btn-icon">
                <i><FaRegTrashAlt /></i>
              </span>
              Excluir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
