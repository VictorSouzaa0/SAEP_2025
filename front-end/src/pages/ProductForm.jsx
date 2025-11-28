import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/service';

export function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', description: '', price: 0, quantity: 0, min_stock: 0
    });

    useEffect(() => {
        if (id) {
            api.getProductById(id).then(setFormData);
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await api.updateProduct(Number(id), formData);
            } else {
                await api.createProduct(formData);
            }
            alert('Salvo com sucesso!');
            navigate('/');
        } catch (error) {
            alert('Erro ao salvar.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{id ? 'Editar Produto' : 'Novo Produto'}</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg space-y-4">
                <div>
                    <label className="block text-gray-700">Nome</label>
                    <input className="w-full border p-2 rounded" required 
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                    <label className="block text-gray-700">Descrição</label>
                    <input className="w-full border p-2 rounded" 
                        value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Preço</label>
                        <input type="number" step="0.01" className="w-full border p-2 rounded" required 
                            value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                    </div>
                    <div>
                        <label className="block text-gray-700">Estoque Mín.</label>
                        <input type="number" className="w-full border p-2 rounded" required 
                            value={formData.min_stock} onChange={e => setFormData({...formData, min_stock: Number(e.target.value)})} />
                    </div>
                </div>
                {!id && (
                    <div>
                        <label className="block text-gray-700">Estoque Inicial</label>
                        <input type="number" className="w-full border p-2 rounded" required 
                            value={formData.quantity} onChange={e => setFormData({...formData, quantity: Number(e.target.value)})} />
                    </div>
                )}
                
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                    Salvar
                </button>
            </form>
        </div>
    );
}