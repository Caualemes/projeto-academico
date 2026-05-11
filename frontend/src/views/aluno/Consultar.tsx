import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetAlunoById } from "../../services/aluno/api/api.aluno";
import type { Aluno } from "../../services/aluno/type/Aluno";
import { ROTA } from "../../services/router/url";

export default function ConsultarAluno() {
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

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Consultar Aluno</h2>
        <form>
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
          <div className="mb-2 mt-4">
            <label htmlFor="idade" className="app-label">Idade:</label>
            <input
              id="idade"
              name="idade"
              value={model?.idade || ""}
              className={getInputClass()}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="usuario" className="app-label">Usuário Vinculado:</label>
            <input
              id="usuario"
              name="usuario"
              value={model?.usuario?.nomeCompleto || ""}
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
              title="Voltar para a lista"
            >
              <span className="btn-icon">
                <i><MdCancel /></i>
              </span>
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
