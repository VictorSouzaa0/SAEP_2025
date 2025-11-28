import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
    const navigate = useNavigate();
    // 1. Recuperar o nome salvo
    const username = localStorage.getItem('user_name') || 'Usuário';

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_name'); // 2. Limpar ao sair
        navigate('/login');
    };

    return (
        <nav className="bg-amazon-dark text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                
                <Link to="/" className="text-2xl font-bold tracking-tight hover:border border-white p-1 rounded">
                    saep<span className="text-amazon-secondary"></span>
                </Link>

                <div className="flex items-center gap-6 text-sm ml-auto">
                    
                    <Link to="/novo" className="flex flex-col hover:border border-white p-1 rounded">
                        <span className="text-xs text-gray-300">Criar</span>
                        <span className="font-bold">Produto</span>
                    </Link>
                    
                    <Link to="/estoque" className="flex flex-col hover:border border-white p-1 rounded">
                        <span className="text-xs text-gray-300">Gerenciar</span>
                        <span className="font-bold">Estoque</span>
                    </Link>

                    <Link to="/historico" className="flex flex-col hover:border border-white p-1 rounded">
                        <span className="text-xs text-gray-300">Ver</span>
                        <span className="font-bold">Histórico</span>
                    </Link>

                    {/* --- EXIBIÇÃO DO USUÁRIO --- */}
                    <div className="flex flex-col text-right mr-2 border-r border-gray-600 pr-4">
                        <span className="text-xs text-gray-300">Olá,</span>
                        <span className="font-bold text-amazon-secondary">{username}</span>
                    </div>

                    <button 
                        onClick={handleLogout} 
                        className="font-bold hover:text-amazon-secondary cursor-pointer"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    );
}