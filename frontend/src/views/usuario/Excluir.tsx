import { useEffect, useState, type FormEvent } from "react";
import { MdCancel } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiGetUsuarioById, apiDeleteUsuario } from "../../services/usuario/api/api.usuario";
import type { Usuario } from "../../services/usuario/type/Usuario";
import { ROTA } from "../../services/router/url";

export default function ExcluirUsuario() {
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
        toast.error("Erro ao carregar usuário.");
        console.log(error);
      }
    }

    getUsuario();
  }, [idUsuario]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!idUsuario) return;
    try {
      await apiDeleteUsuario(idUsuario);
      toast.success("Usuário excluído com sucesso!");
      navigate(ROTA.USUARIO.LISTAR);
    } catch (err: any) {
      toast.error(err.response?.data?.mensagem || "Erro ao excluir usuário.");
    }
  };

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Excluir Usuário</h2>
        <form onSubmit={handleSubmit}>
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
            <p className="text-danger mt-2" style={{fontWeight: 'bold'}}>
              Tem certeza que deseja excluir este usuário? Esta ação não poderá ser desfeita.
            </p>
          </div>
          <div className="btn-content mt-4">
            <button
              id="cancel"
              type="button"
              className="btn btn-cancel"
              onClick={() => navigate(ROTA.USUARIO.LISTAR)}
              title="Cancelar a Exclusão"
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
              className="btn btn-delete"
              title="Confirmar Exclusão"
            >
              <span className="btn-icon">
                <i>
                  <FaRegTrashAlt />
                </i>
              </span>
              Excluir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
