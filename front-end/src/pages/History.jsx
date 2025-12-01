import { useEffect, useState } from 'react';
import { api } from '../api/service';

export function History() {
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await api.getMovements();
                const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setMovements(sorted);
            } catch (error) {
                console.error("Erro ao carregar histórico", error);
            }
        };
        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('pt-BR');
    };

    return (
        <div className="container mx-auto p-4 md:p-6 bg-white mt-4 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-normal text-black mb-4 border-b border-gray-200 pb-2">
                Histórico de Modificações
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-xs uppercase border-b border-gray-300">
                            <th className="py-2 px-4 text-left">Data/Hora</th>
                            <th className="py-2 px-4 text-left">Produto</th>
                            <th className="py-2 px-4 text-center">Tipo</th>
                            <th className="py-2 px-4 text-center">Qtd.</th>
                            <th className="py-2 px-4 text-left">Responsável</th>
                        </tr>
                    </thead>
                    <tbody className="text-amazon-text">
                        {movements.map((mov) => (
                            <tr key={mov.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-2 px-4 text-gray-500">
                                    {formatDate(mov.date)}
                                </td>
                                <td className="py-2 px-4 font-bold text-amazon-blue">
                                    {mov.product_name || `ID: ${mov.product}`}
                                </td>
                                <td className="py-2 px-4 text-center">
                                    {mov.movement_type === 'ENTRY' 
                                        ? <span className="text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded text-xs">ENTRADA</span>
                                        : <span className="text-red-700 font-bold bg-red-100 px-2 py-0.5 rounded text-xs">SAÍDA</span>
                                    }
                                </td>
                                <td className="py-2 px-4 text-center font-medium">
                                    {mov.quantity}
                                </td>
                                <td className="py-2 px-4 text-gray-600">
                                    {mov.responsible_name || 'Sistema'}
                                </td>
                            </tr>
                        ))}
                        {movements.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    Nenhuma movimentação registrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}