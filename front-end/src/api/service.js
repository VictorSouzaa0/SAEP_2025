const API_URL = 'http://127.0.0.1:8000';

const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return token ? { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    } : { 
        'Content-Type': 'application/json' 
    };
};

export const api = {
    login: async (username, password) => {
        const response = await fetch(`${API_URL}/api/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) throw new Error('Falha no login');
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return data;
    },

    getProducts: () => fetch(`${API_URL}/products/`, { headers: getAuthHeaders() }).then(res => res.json()),
    
    getProductById: (id) => fetch(`${API_URL}/products/${id}/`, { headers: getAuthHeaders() }).then(res => res.json()),

    createProduct: (data) => fetch(`${API_URL}/products/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    }),

    updateProduct: (id, data) => fetch(`${API_URL}/products/${id}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    }),

    deleteProduct: (id) => fetch(`${API_URL}/products/${id}/`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
    }),

    registerMovement: (data) => fetch(`${API_URL}/movements/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    }),

    // --- NOVA FUNÇÃO PARA O HISTÓRICO ---
    getMovements: () => fetch(`${API_URL}/movements/`, { 
        headers: getAuthHeaders() 
    }).then(res => res.json())
};