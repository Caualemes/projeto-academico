import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { http } from '../../services/axios/config.axios';
import { ROTA } from '../../services/router/url';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await http.post('/auth/login', { email, senha });
      if (response.data.access_token) {
        login(response.data.user, response.data.access_token);
        toast.success('Login realizado com sucesso!');
        navigate(ROTA.USUARIO.LISTAR);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.mensagem || err.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error('E-mail ou senha inválidos.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="display" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #1f2937, #111827)' }}>
      <div className="card animated fadeInDown" style={{ maxWidth: '400px', width: '100%', padding: '2rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '1.5rem', fontWeight: 600 }}>Acesso ao Sistema</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="form-label" style={{ color: '#d1d5db', fontSize: '0.875rem' }}>E-mail</label>
            <input 
              type="email" 
              className="form-control" 
              style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', padding: '0.75rem' }}
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label" style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Senha</label>
            <input 
              type="password" 
              className="form-control" 
              style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', padding: '0.75rem' }}
              value={senha} 
              onChange={e => setSenha(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#3b82f6', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s' }}>
            {loading ? 'Acessando...' : 'Entrar'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/auth/esqueci-senha" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '0.875rem' }}>Esqueci minha senha</Link>
          <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            Não tem uma conta? <Link to={ROTA.USUARIO.CRIAR} style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 500 }}>Cadastre-se</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
