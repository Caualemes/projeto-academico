import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { MdCancel } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiGetUsuarioById, apiUpdateUsuario } from "../../services/usuario/api/api.usuario";
import type { Usuario } from "../../services/usuario/type/Usuario";
import { ROTA } from "../../services/router/url";

export default function AlterarUsuario() {
  const { idUsuario } = useParams<{ idUsuario: string }>();
  const [model, setModel] = useState<Partial<Usuario>>({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsuario() {
      try {
        if (idUsuario) {
          const response = await apiGetUsuarioById(idUsuario);
          if (response.data.dados) {
            setModel({
              firstName: response.data.dados.firstName,
              lastName: response.data.dados.lastName,
              username: response.data.dados.username,
            });
          }
        }
      } catch (error: any) {
        toast.error("Erro ao carregar usuário.");
        console.log(error);
      }
    }

    getUsuario();
  }, [idUsuario]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModel({ ...model, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!idUsuario) return;
    try {
      await apiUpdateUsuario(idUsuario, model);
      toast.success("Usuário atualizado com sucesso!");
      navigate(ROTA.USUARIO.LISTAR);
    } catch (err: any) {
      toast.error(err.response?.data?.mensagem || "Erro ao atualizar usuário.");
    }
  };

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Alterar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 mt-4">
            <label htmlFor="firstName" className="app-label">
              Nome:
            </label>
            <input
              id="firstName"
              name="firstName"
              value={model.firstName || ""}
              onChange={handleChange}
              className={getInputClass()}
              required
            />
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="lastName" className="app-label">
              Sobrenome:
            </label>
            <input
              id="lastName"
              name="lastName"
              value={model.lastName || ""}
              onChange={handleChange}
              className={getInputClass()}
              required
            />
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="username" className="app-label">
              Username:
            </label>
            <input
              id="username"
              name="username"
              value={model.username || ""}
              onChange={handleChange}
              className={getInputClass()}
              required
            />
          </div>
          <div className="btn-content mt-4">
            <button
              id="cancel"
              type="button"
              className="btn btn-cancel"
              onClick={() => navigate(ROTA.USUARIO.LISTAR)}
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
      </div>
    </div>
  );
}
