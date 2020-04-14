import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

const actions = {
    load: () => api.get('categories'),
    delete: (id) => api.delete(`categories/${id}`),
    create: (input) => api.post('categories', {
        category: input
    }),

    edit: (category, newCategory) => api.put(`categories/${category}`, { 
        category: newCategory 
    }),

    createProduct: (product) => api.post('products', product)
}

export default actions;