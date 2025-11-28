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

                if (Number(formData.quantity) < Number(formData.min_stock)) {
                    alert(' ATENÇÃO: As alterações foram salvas, mas o produto entrou em nível CRÍTICO de estoque!');
                } else {
                    alert('Produto atualizado com sucesso!');
                }
            } else {
                await api.createProduct(formData);
                alert('Produto criado com sucesso!');
            }
            navigate('/');
        } catch (error) {
            alert('Erro ao salvar produto.');
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-2xl bg-white mt-4 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-normal text-black mb-6 border-b border-gray-200 pb-2">
                {id ? 'Editar Detalhes do Produto' : 'Adicionar Novo Produto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Produto</label>
                    <input className="w-full border border-gray-400 p-2 rounded bg-white focus:ring-2 focus:ring-amazon-secondary focus:outline-none" required 
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Descrição</label>
                    <input className="w-full border border-gray-400 p-2 rounded bg-white focus:ring-2 focus:ring-amazon-secondary focus:outline-none" 
                        value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Preço</label>
                        <input type="number" step="0.01" className="w-full border border-gray-400 p-2 rounded bg-white focus:ring-2 focus:ring-amazon-secondary focus:outline-none" required 
                            value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Estoque Mínimo</label>
                        <input type="number" className="w-full border border-gray-400 p-2 rounded bg-white focus:ring-2 focus:ring-amazon-secondary focus:outline-none" required 
                            value={formData.min_stock} onChange={e => setFormData({...formData, min_stock: Number(e.target.value)})} />
                    </div>
                </div>
                
              
                {!id && (
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Quantidade Inicial</label>
                        <input type="number" className="w-full border border-gray-400 p-2 rounded bg-white focus:ring-2 focus:ring-amazon-secondary focus:outline-none" required 
                            value={formData.quantity} onChange={e => setFormData({...formData, quantity: Number(e.target.value)})} />
                    </div>
                )}
                
                <div className="pt-4">
                    <button type="submit" className="btn-amazon-primary py-2 font-bold">
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
}