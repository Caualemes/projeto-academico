import React, { useState } from 'react';
import { http } from '../../services/axios/config.axios';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RedefinirSenha() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRedefinir = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !email) {
      toast.error('Link inválido ou incompleto.');
      return;
    }
    if (novaSenha !== confirmSenha) {
      toast.error('As senhas não coincidem!');
      return;
    }
    if (novaSenha.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await http.post('/auth/redefinir-senha', { email, token, novaSenha });
      toast.success(response.data.message || 'Senha redefinida com sucesso!');
      setTimeout(() => navigate('/auth/login'), 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.mensagem || err.response?.data?.message;
      toast.error(errorMessage || 'Token inválido ou expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="display" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #1f2937, #111827)' }}>
      <div className="card animated fadeInDown" style={{ maxWidth: '400px', width: '100%', padding: '2rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '1.5rem', fontWeight: 600 }}>Redefinir Senha</h2>
        <form onSubmit={handleRedefinir}>
          <div className="mb-4">
            <label className="form-label" style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Nova Senha</label>
            <input 
              type="password" 
              className="form-control" 
              style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', padding: '0.75rem' }}
              value={novaSenha} 
              onChange={e => setNovaSenha(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label" style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Confirmar Nova Senha</label>
            <input 
              type="password" 
              className="form-control" 
              style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', padding: '0.75rem' }}
              value={confirmSenha} 
              onChange={e => setConfirmSenha(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#3b82f6', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s' }}>
            {loading ? 'Redefinindo...' : 'Redefinir Senha'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to="/auth/login" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '0.875rem' }}>Voltar para o Login</Link>
        </div>
      </div>
    </div>
  );
}
