import axios from 'axios';

const baseURL = "http://localhost:3001/";

const api = axios.create({
    baseURL: baseURL
});

export function makeAbsoluteUrl(path) {
    return new URL(path, baseURL).toString();
}

export const fetchProducts = async (searchInput, category) => {
    let query = searchInput ? `?q=${searchInput}` : "";
    if (category) {
        if (query)
            query += "&";
        else
            query += "?"

        query += `category=${category}`;
    }
    const { data } = await api.get(`products${query}`);

    return data;
}

export const fetchProduct = async (productId) => {
    const { data } = await api.get(`products/${productId}`);

    return data;
}

export const fetchProductsWithId = async (idList) => {
    if (idList && idList.length > 0) {
        const idQuery = idList.map(id => `id=${id}`).join('&');
        const { data } = await api.get(`products?${idQuery}`);

        return data;
    }

    return [];
}

export const fetchCategories = async () => {
    const { data } = await api.get(`categories`);

    return data;
}