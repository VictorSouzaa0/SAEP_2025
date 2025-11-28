import { useEffect, useState } from 'react';
import { api } from '../api/service';

export function StockManager() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [qty, setQty] = useState(0);
    const [type, setType] = useState('ENTRY');

    useEffect(() => {
        api.getProducts().then(setProducts);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (type === 'EXIT') {
            const prod = products.find(p => p.id === Number(selectedProduct));
            if (prod) {
                if (prod.quantity < qty) {
                    alert('ERRO: Quantidade insuficiente em estoque!');
                    return;
                }
                if ((prod.quantity - qty) < prod.min_stock) {
                    const confirmar = window.confirm('ATENÇÃO: Esta saída deixará o estoque abaixo do mínimo. Deseja continuar?');
                    if (!confirmar) return;
                }
            }
        }

        try {
            await api.registerMovement({ 
                product: Number(selectedProduct), 
                quantity: qty, 
                movement_type: type 
            });
            
            alert('Movimentação registrada com sucesso!');
            setQty(0);
            
            const updatedProducts = await api.getProducts();
            setProducts(updatedProducts);

        } catch (error) {
            console.error("Erro ao registrar:", error);
            alert('Erro na movimentação. Verifique o console.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Gerenciar Estoque</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg space-y-4">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Produto</label>
                    <select 
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                        value={selectedProduct} 
                        onChange={e => setSelectedProduct(e.target.value)}
                    >
                        <option value="">Selecione...</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name} (Saldo Atual: {p.quantity})
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Tipo</label>
                        <select 
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={type} 
                            onChange={e => setType(e.target.value)}
                        >
                            <option value="ENTRY">Entrada (+)</option>
                            <option value="EXIT">Saída (-)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Quantidade</label>
                        <input 
                            type="number" 
                            min="1" 
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            required 
                            value={qty} 
                            onChange={e => setQty(Number(e.target.value))} 
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    className={`w-full text-white p-3 rounded font-bold transition duration-200 
                        ${type === 'ENTRY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                    Confirmar {type === 'ENTRY' ? 'Entrada' : 'Saída'}
                </button>
            </form>
        </div>
    );
}