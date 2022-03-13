import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:3001/`
});

export const fetchProducts = async (searchInput) => {
    const query = searchInput ? `?q=${searchInput}` : "";
    const {data} = await api.get(`products${query}`);

    return data;
}

export const fetchProduct = async (productId) => {
    const {data} = await api.get(`products/${productId}`);

    return data;
}