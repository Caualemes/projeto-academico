import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import AlterarCidade from "../../views/cidade/Alterar";
import ConsultarCidade from "../../views/cidade/Consultar";
import CriarCidade from "../../views/cidade/Criar";
import ExcluirCidade from "../../views/cidade/Excluir";
import ListarCidade from "../../views/cidade/Listar";
import AlterarUsuario from "../../views/usuario/Alterar";
import ConsultarUsuario from "../../views/usuario/Consultar";
import ExcluirUsuario from "../../views/usuario/Excluir";
import CriarUsuario from "../../views/usuario/Criar";
import ListarUsuario from "../../views/usuario/Listar";
import AlterarProfessor from "../../views/professor/Alterar";
import ConsultarProfessor from "../../views/professor/Consultar";
import CriarProfessor from "../../views/professor/Criar";
import ExcluirProfessor from "../../views/professor/Excluir";
import ListarProfessor from "../../views/professor/Listar";
import AlterarAluno from "../../views/aluno/Alterar";
import ConsultarAluno from "../../views/aluno/Consultar";
import CriarAluno from "../../views/aluno/Criar";
import ExcluirAluno from "../../views/aluno/Excluir";
import ListarAluno from "../../views/aluno/Listar";
import Login from "../../views/auth/Login";
import EsqueciSenha from "../../views/auth/EsqueciSenha";
import RedefinirSenha from "../../views/auth/RedefinirSenha";
import ConfirmEmail from "../../views/auth/ConfirmEmail";
import AlterarDisciplina from "../../views/disciplina/Alterar";
import ConsultarDisciplina from "../../views/disciplina/Consultar";
import CriarDisciplina from "../../views/disciplina/Criar";
import ExcluirDisciplina from "../../views/disciplina/Excluir";
import ListarDisciplina from "../../views/disciplina/Listar";
import Matricula from "../../views/disciplina/Matricula";
import LancamentoNotas from "../../views/avaliacao/LancamentoNotas";



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
        path: `${ROTA.USUARIO.ATUALIZAR}/:idUsuario`,
        element: <AlterarUsuario />,
      },
      {
        path: `${ROTA.USUARIO.EXCLUIR}/:idUsuario`,
        element: <ExcluirUsuario />,
      },
      {
        path: `${ROTA.USUARIO.POR_ID}/:idUsuario`,
        element: <ConsultarUsuario />,
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
      {
        path: ROTA.PROFESSOR.LISTAR,
        element: <ListarProfessor />,
      },
      {
        path: ROTA.PROFESSOR.CRIAR,
        element: <CriarProfessor />,
      },
      {
        path: `${ROTA.PROFESSOR.ATUALIZAR}/:id`,
        element: <AlterarProfessor />,
      },
      {
        path: `${ROTA.PROFESSOR.EXCLUIR}/:id`,
        element: <ExcluirProfessor />,
      },
      {
        path: `${ROTA.PROFESSOR.POR_ID}/:id`,
        element: <ConsultarProfessor />,
      },
      {
        path: ROTA.ALUNO.LISTAR,
        element: <ListarAluno />,
      },
      {
        path: ROTA.ALUNO.CRIAR,
        element: <CriarAluno />,
      },
      {
        path: `${ROTA.ALUNO.ATUALIZAR}/:id`,
        element: <AlterarAluno />,
      },
      {
        path: `${ROTA.ALUNO.EXCLUIR}/:id`,
        element: <ExcluirAluno />,
      },
      {
        path: `${ROTA.ALUNO.POR_ID}/:id`,
        element: <ConsultarAluno />,
      },
      {
        path: ROTA.DISCIPLINA.LISTAR,
        element: <ListarDisciplina />,
      },
      {
        path: ROTA.DISCIPLINA.CRIAR,
        element: <CriarDisciplina />,
      },
      {
        path: `${ROTA.DISCIPLINA.ATUALIZAR}/:id`,
        element: <AlterarDisciplina />,
      },
      {
        path: `${ROTA.DISCIPLINA.EXCLUIR}/:id`,
        element: <ExcluirDisciplina />,
      },
      {
        path: `${ROTA.DISCIPLINA.POR_ID}/:id`,
        element: <ConsultarDisciplina />,
      },
      {
        path: '/sistema/disciplina/matricula',
        element: <Matricula />,
      },
      {
        path: '/sistema/avaliacao/notas',
        element: <LancamentoNotas />,
      },
    ],
  }]
  }
];
