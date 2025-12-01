import { useEffect, useState } from 'react';
import { api } from '../api/service';
import { Link } from 'react-router-dom';

export function ProductList() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const loadProducts = async () => {
        try {
            const data = await api.getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
        }
    };

    useEffect(() => { loadProducts(); }, []);

    const handleDelete = async (id) => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            await api.deleteProduct(id);
            loadProducts();
        }
    };

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 md:p-6 bg-white mt-4 shadow-sm border border-gray-200">
            <div className="flex justify-between items-end mb-4 border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-normal text-black">Seus Produtos</h2>
                <input 
                    type="text" 
                    placeholder="Filtrar nesta lista..." 
                    className="border border-gray-400 p-1 rounded text-sm bg-white focus:ring-2 focus:ring-amazon-secondary focus:outline-none"
                    value={search} 
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-xs uppercase border-b border-gray-300">
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">Nome do Produto</th>
                            <th className="py-2 px-4 text-right">Preço</th>
                            <th className="py-2 px-4 text-center">Estoque</th>
                            <th className="py-2 px-4 text-center">Status</th>
                            <th className="py-2 px-4 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-amazon-text">
                        {filtered.map(product => {
                            const quantity = Number(product.quantity);
                            const minStock = Number(product.min_stock);
                            const isLowStock = quantity < minStock;
                            
                            return (
                                <tr key={product.id} className={`border-b border-gray-200 hover:bg-gray-50 ${isLowStock ? 'bg-red-50' : ''}`}>
                                    <td className="py-2 px-4 text-gray-500">{product.id}</td>
                                    <td className="py-2 px-4 font-bold text-amazon-blue hover:underline cursor-pointer">
                                        {product.name}
                                    </td>
                                    <td className="py-2 px-4 text-right text-red-700 font-medium">
                                        R$ {Number(product.price).toFixed(2)}
                                    </td>
                                    <td className="py-2 px-4 text-center">{quantity}</td>
                                    <td className="py-2 px-4 text-center">
                                        {isLowStock 
                                            ? <span className="text-red-600 font-bold text-xs">BAIXO ({quantity})</span>
                                            : <span className="text-green-700 text-xs">Em estoque</span>
                                        }
                                    </td>
                                    <td className="py-2 px-4 text-center space-x-2">
                                        <Link to={`/editar/${product.id}`} className="inline-block px-2 py-1 border border-gray-400 rounded bg-gray-100 text-xs hover:bg-gray-200 shadow-sm text-black no-underline">
                                            Editar
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(product.id)} 
                                            className="px-2 py-1 border border-gray-400 rounded bg-gray-100 text-xs hover:bg-gray-200 shadow-sm text-red-600 cursor-pointer"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    Nenhum produto encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}