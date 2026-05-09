import { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ROTA } from '../../services/router/url';
import { apiPostUsuario } from '../../services/usuario/api/api.usuario';
import type { Usuario } from '../../services/usuario/type/Usuario';

export default function CriarUsuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreate = async () => {
    // Validação Frontend Simplificada
    if (!usuario.firstName || !usuario.lastName || !usuario.username || !usuario.email || !usuario.password) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    
    // Validar formatação do e-mail
    if (!usuario.email.includes('@') || !usuario.email.includes('.')) {
        setErrorMessage('Por favor, digite um endereço de E-mail válido!');
        return;
    }

    if (usuario.password !== usuario.confirmPassword) {
      setErrorMessage('A confirmação de senha não coincide com a senha digitada!');
      return;
    }

    if (usuario.password.length < 6) {
      setErrorMessage('A senha deve conter no mínimo 6 caracteres!');
      return;
    }
    
    try {
      await apiPostUsuario(usuario);
      navigate(ROTA.USUARIO.LISTAR);
    } catch (e: any) {
      setErrorMessage(e.response?.data?.mensagem || 'Falha ao criar o usuário! Email ou Username já podem existir.');
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown" style={{ maxWidth: '800px' }}>
        <h2>Registrar Novo Usuário</h2>
        <br />
        {errorMessage && <div className="alert">{errorMessage}</div>}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 2rem' }}>
          <div className="mb-3">
            <label className="form-label">Primeiro Nome *</label>
            <input
              type="text"
              className="form-control"
              value={usuario.firstName}
              onChange={(e) => setUsuario({ ...usuario, firstName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Sobrenome *</label>
            <input
              type="text"
              className="form-control"
              value={usuario.lastName}
              onChange={(e) => setUsuario({ ...usuario, lastName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username *</label>
            <input
              type="text"
              className="form-control"
              value={usuario.username}
              onChange={(e) => setUsuario({ ...usuario, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input
              type="email"
              className="form-control"
              value={usuario.email}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha *</label>
            <input
              type="password"
              className="form-control"
              value={usuario.password}
              onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmar Senha *</label>
            <input
              type="password"
              className="form-control"
              value={usuario.confirmPassword}
              onChange={(e) => setUsuario({ ...usuario, confirmPassword: e.target.value })}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
          <button className="btn btn-add" onClick={handleCreate} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaSave /> Salvar e Registrar
          </button>
          <Link to={ROTA.USUARIO.LISTAR} className="btn btn-cancel" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <FaTimes /> Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
}
