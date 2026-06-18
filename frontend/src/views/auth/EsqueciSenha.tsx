import React, { useState } from 'react';
import { http } from '../../services/axios/config.axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecuperar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await http.post('/auth/esqueci-senha', { email });
      toast.success(response.data.message || 'Link de recuperação enviado. Por favor, cheque sua caixa de entrada.');
      setEmail('');
    } catch (err: any) {
      toast.error('Ocorreu um erro ao solicitar a recuperação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="display" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #1f2937, #111827)' }}>
      <div className="card animated fadeInDown" style={{ maxWidth: '400px', width: '100%', padding: '2rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '1.5rem', fontWeight: 600 }}>Recuperar Senha</h2>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          Digite seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
        <form onSubmit={handleRecuperar}>
          <div className="mb-4">
            <label className="form-label" style={{ color: '#d1d5db', fontSize: '0.875rem' }}>E-mail</label>
            <input 
              type="email" 
              className="form-control" 
              style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', padding: '0.75rem' }}
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              placeholder="seu@email.com"
            />
          </div>
          <button type="submit" className="btn" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#3b82f6', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s' }}>
            {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to="/auth/login" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '0.875rem' }}>Voltar para o Login</Link>
        </div>
      </div>
    </div>
  );
}
