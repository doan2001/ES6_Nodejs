import { axiosClient } from './axiosClient';

const cartApi = {
    add(product) {
        const url = `/add_cart`;
        return axiosClient.post(url, product);
    },

    getAll() {
        const url = `/cart`;
        return axiosClient.get(url);
    },

    updateCart(newProduct, id) {
        const url = `/add_cart/${id}`;
        return axiosClient.put(url, newProduct)
    },

    remove(id) {
        const url = `/remove_cart/${id}`;
        return axiosClient.delete(url);
    },

    removeMultiple(id) {
        const url = `/remove_cart/multiple/${id}`;
        return axiosClient.delete(url);
    }
}

export default cartApi;