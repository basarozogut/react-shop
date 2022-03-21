import axios from 'axios';

const baseURL = "http://localhost:3001/";

const api = axios.create({
    baseURL: baseURL
});

export function makeAbsoluteUrl(path) {
    return new URL(path, baseURL).toString();
}

export const fetchProducts = async (searchInput) => {
    const query = searchInput ? `?q=${searchInput}` : "";
    const {data} = await api.get(`products${query}`);

    return data;
}

export const fetchProduct = async (productId) => {
    const {data} = await api.get(`products/${productId}`);

    return data;
}

export const fetchProductsWithId = async (idList) => {
    if (idList && idList.length > 0) {
        const idQuery = idList.map(id => `id=${id}`).join('&');
        const {data} = await api.get(`products?${idQuery}`);
    
        return data;
    }
    
    return [];
}