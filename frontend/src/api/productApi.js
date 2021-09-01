import { axiosClient, formData } from './axiosClient';

import storage from './../storages/storage';
import { currentURL, getUrlParams } from './../utils';

const paramUrl = getUrlParams(window.location.href);

const user = storage.getId();

const productApi = {
    getAll () {
        // if(page){
        //     const url = `/products?page=${page}`;
        //     return axiosClient.get(url);
        // } else {
        //     const url = `/products`;
        //     return axiosClient.get(url);
        // }
        const url = `/products`;
        
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },

    remove(id) {
    	const url = `/product/${id}/${user.user._id}`;
    	return axiosClient.delete(url, {headers: { 'Authorization': `Bearer ${user.token}` }});
    },

    add(product) {
        const url = `/products/add/${user.user._id}`;
        return axiosClient.post(url, product, {headers: { 'Authorization': `Bearer ${user.token}` }});
    },

    update(id, newProduct) {
        const url = `/product/${id}/${user.user._id}`;
        return axiosClient.put(url, newProduct, {headers: { 'Authorization': `Bearer ${user.token}` }});
    },

    search(value){
        const url = `/search?q=${value}`;
        return axiosClient.get(url);
    },

    // pagination(page){
    //     const url = `/products`
    // }
    
}

export default productApi;