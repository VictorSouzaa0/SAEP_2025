import { Routes, Route } from 'react-router-dom';
import { ProductList } from '../pages/ProductList';
import { ProductForm } from '../pages/ProductForm';
import { StockManager } from '../pages/StockManager';
import { History } from '../pages/History'; // Importar History
import { Login } from '../pages/Login';
import { PrivateRoute } from '../components/PrivateRoute';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
            <Route path="/novo" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
            <Route path="/editar/:id" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
            <Route path="/estoque" element={<PrivateRoute><StockManager /></PrivateRoute>} />
            
            {/* Rota do Histórico */}
            <Route path="/historico" element={<PrivateRoute><History /></PrivateRoute>} />
        </Routes>
    );
}