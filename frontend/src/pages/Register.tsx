import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo behaviour: after register navigate to home
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-2">Criar conta</h1>
        <p className="text-sm text-gray-500 mb-6">Cadastre-se para começar a usar o Quero Bem-Estar</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input required type="text" placeholder="Seu nome" className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-emerald-400 p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input required type="email" placeholder="seu@exemplo.com" className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-emerald-400 p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input required type="password" placeholder="••••••••" className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-emerald-400 p-2" />
          </div>

          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg">Criar conta</button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <span>Já tem conta? </span>
          <Link to="/login" className="text-emerald-600 font-medium">Entrar</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
