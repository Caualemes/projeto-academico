import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetUsuarioById } from "../../services/usuario/api/api.usuario";
import type { Usuario } from "../../services/usuario/type/Usuario";
import { ROTA } from "../../services/router/url";

export default function ConsultarUsuario() {
  const { idUsuario } = useParams<{ idUsuario: string }>();
  const [model, setModel] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsuario() {
      try {
        if (idUsuario) {
          const response = await apiGetUsuarioById(idUsuario);
          if (response.data.dados) {
            setModel(response.data.dados);
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    getUsuario();
  }, [idUsuario]);

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Consultar Usuário</h2>
        <form>
          <div className="mb-2 mt-4">
            <label htmlFor="firstName" className="app-label">
              Nome:
            </label>
            <input
              id="firstName"
              name="firstName"
              value={model?.firstName || ""}
              className={getInputClass()}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="lastName" className="app-label">
              Sobrenome:
            </label>
            <input
              id="lastName"
              name="lastName"
              value={model?.lastName || ""}
              className={getInputClass()}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="username" className="app-label">
              Username:
            </label>
            <input
              id="username"
              name="username"
              value={model?.username || ""}
              className={getInputClass()}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="email" className="app-label">
              E-mail:
            </label>
            <input
              id="email"
              name="email"
              value={model?.email || ""}
              className={getInputClass()}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="status" className="app-label">
              Status de Verificação:
            </label>
            <input
              id="status"
              name="status"
              value={model?.statusValidacao ? "Verificado" : "Pendente"}
              className={getInputClass()}
              readOnly={true}
              disabled={true}
              style={{ color: model?.statusValidacao ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}
            />
          </div>
          <div className="btn-content mt-4">
            <button
              id="cancel"
              type="button"
              className="btn btn-cancel"
              onClick={() => navigate(ROTA.USUARIO.LISTAR)}
              title="Voltar para a lista"
            >
              <span className="btn-icon">
                <i>
                  <MdCancel />
                </i>
              </span>
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
