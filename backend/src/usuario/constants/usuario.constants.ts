export const USUARIO = {
  ENTITY: 'usuario',
  ROTA: {
    SISTEMA: 'sistema/usuario',
    PUBLIC: 'public/usuario',
  },
  TITULO: {
    LISTA: 'Lista de Usuário',
    NOVO: 'Novo Usuário',
    ATUALIZAR: 'Atualizar Usuário',
  },
  LABEL: {
    NOME: 'Nome',
    USERNAME: 'Usuário',
    EMAIL: 'E-mail',
  },
  TABLE_FIELD: {
    FIRST_NAME: 'usuario.firstName',
    USERNAME: 'usuario.username',
    EMAIL: 'usuario.email'
  },
};

export const fieldsUsuario: string[] = [
    'firstName',
    'lastName',
    'username',
    'email'
];
