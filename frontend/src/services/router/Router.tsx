import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import AlterarCidade from "../../views/cidade/Alterar";
import ConsultarCidade from "../../views/cidade/Consultar";
import CriarCidade from "../../views/cidade/Criar";
import ExcluirCidade from "../../views/cidade/Excluir";
import ListarCidade from "../../views/cidade/Listar";
import CriarUsuario from "../../views/usuario/Criar";
import ListarUsuario from "../../views/usuario/Listar";
import Login from "../../views/auth/Login";
import EsqueciSenha from "../../views/auth/EsqueciSenha";
import RedefinirSenha from "../../views/auth/RedefinirSenha";
import ConfirmEmail from "../../views/auth/ConfirmEmail";
import { PrivateRoute } from "../../components/PrivateRoute";
import { ROTA } from "./url";

//localhost:3000/sistema/cidade/listar

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />
  },
  {
    path: "/auth/login",
    element: <Login />
  },
  {
    path: "/auth/esqueci-senha",
    element: <EsqueciSenha />
  },
  {
    path: "/redefinir-senha",
    element: <RedefinirSenha />
  },
  {
    path: "/confirmar-email",
    element: <ConfirmEmail />
  },
  {
    path: ROTA.USUARIO.CRIAR,
    element: <CriarUsuario />
  },
  {
    path: "/sistema",
    element: <PrivateRoute />, // componente de protecao
    children: [
      {
        path: "/sistema",
        element: <Layout />, // componente (pai)
        children: [
      {
        path: "/sistema/dashboard", //url
        element: <Dashboard />, //componente a ser carregado (filho)
      },
      {
        path: ROTA.USUARIO.LISTAR,
        element: <ListarUsuario />,
      },
      {
        path: ROTA.CIDADE.LISTAR,
        element: <ListarCidade />,
      },
      {
        path: ROTA.CIDADE.CRIAR,
        element: <CriarCidade />,
      },
      {
        path: `${ROTA.CIDADE.ATUALIZAR}/:idCidade`,
        element: <AlterarCidade />,
      },
      {
        path: `${ROTA.CIDADE.EXCLUIR}/:idCidade`,
        element: <ExcluirCidade />,
      },
      {
        path: `${ROTA.CIDADE.POR_ID}/:idCidade`,
        element: <ConsultarCidade />,
      },
    ],
  }]
  }
];
