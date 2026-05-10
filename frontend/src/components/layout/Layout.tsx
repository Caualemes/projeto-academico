import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./layout.css";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/sistema/dashboard">Dashboard</Link>
        <Link to="/sistema/cidade/listar">Cidade</Link>
        <Link to="/sistema/usuario/listar">Usuários</Link>
        <Link to="/sistema/professor/listar">Professores</Link>
      </aside>
      <div className="content">
        <header>
          <div className="system-title">
            <b>Sistema Acadêmico</b>
          </div>
          <div className="user-info">
            <span className="username">
              <b>{user?.firstName || 'Usuário'}</b>
            </span>
            <button onClick={logout} className="btn btn-logout" style={{ cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
