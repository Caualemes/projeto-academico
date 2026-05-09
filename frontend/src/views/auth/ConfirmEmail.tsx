import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { http } from '../../services/axios/config.axios';
import { toast } from 'react-toastify';

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email || !token) {
      toast.error('Link de confirmação inválido.');
      setLoading(false);
      return;
    }

    const confirmar = async () => {
      try {
        const response = await http.get(`/auth/confirmar-email?email=${encodeURIComponent(email)}&token=${token}`);
        toast.success(response.data.message || 'E-mail confirmado com sucesso!');
        setSuccess(true);
        setTimeout(() => navigate('/auth/login'), 3000);
      } catch (err: any) {
        const errorMessage = err.response?.data?.mensagem || err.response?.data?.message;
        toast.error(errorMessage || 'Erro ao confirmar e-mail. Token inválido ou expirado.');
      } finally {
        setLoading(false);
      }
    };

    confirmar();
  }, [email, token, navigate]);

  return (
    <div className="display" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #1f2937, #111827)' }}>
      <div className="card animated fadeInDown" style={{ maxWidth: '400px', width: '100%', padding: '2rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: '1.5rem', fontWeight: 600 }}>Confirmação de E-mail</h2>
        
        {loading ? (
          <p style={{ color: '#9ca3af' }}>Aguarde enquanto validamos seu e-mail...</p>
        ) : success ? (
          <div>
            <p style={{ color: '#86efac', marginBottom: '1rem' }}>Sua conta foi ativada com sucesso!</p>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Você será redirecionado para o login em breve.</p>
          </div>
        ) : (
          <div>
            <p style={{ color: '#fca5a5', marginBottom: '1rem' }}>Falha na validação.</p>
            <Link to="/auth/login" className="btn" style={{ textDecoration: 'none', padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff', borderRadius: '8px' }}>Ir para o Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}
