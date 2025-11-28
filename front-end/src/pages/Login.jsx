import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/service';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // 1. Chama a API para pegar o token
            await api.login(username, password);
            
            // 2. Salva o nome do usuário para mostrar na Navbar
            localStorage.setItem('user_name', username);
            
            // 3. Redireciona para a página inicial
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Houve um problema com seu login. Verifique usuário e senha.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-10 bg-white">

            <h1 className="text-3xl font-bold mb-6 tracking-tight">
                saep<span className="text-amazon-secondary"></span>
            </h1>
            
            <div className="w-full max-w-sm border border-gray-300 rounded p-8 shadow-sm bg-white">
                <h2 className="text-3xl font-normal mb-4">Fazer login</h2>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            E-mail ou usuário
                        </label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-400 p-2 rounded bg-white focus:ring-2 focus:ring-amazon-secondary focus:border-amazon-secondary focus:outline-none shadow-inner"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Senha
                        </label>
                        <input 
                            type="password" 
                            className="w-full border border-gray-400 p-2 rounded bg-white focus:ring-2 focus:ring-amazon-secondary focus:border-amazon-secondary focus:outline-none shadow-inner"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" className="btn-amazon-primary mt-4 py-2 font-medium">
                        Continuar
                    </button>
                </form>

                <div className="mt-8 text-xs text-gray-600 leading-snug">
                    <p>
                        Ao continuar, você concorda com as <a href="#" className="text-blue-700 hover:underline hover:text-orange-700">Condições de Uso</a> da Amazon. 
                        Por favor verifique a <a href="#" className="text-blue-700 hover:underline hover:text-orange-700">Notificação de Privacidade</a>.
                    </p>
                </div>

                <div className="mt-6 text-xs text-gray-600">
                    <a href="#" className="text-blue-700 hover:underline hover:text-orange-700">
                        Precisa de ajuda?
                    </a>
                </div>
            </div>
            
            <div className="mt-8 text-center text-xs text-gray-500 space-y-2 w-full max-w-sm">
                <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-2 text-gray-500">Novo no sistema?</span>
                    </div>
                </div>
            </div>
        </div>
    );
}