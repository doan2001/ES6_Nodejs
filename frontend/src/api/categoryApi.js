import { axiosClient } from './axiosClient';
import storage from './../storages/storage';

// đường link phải trùng với router
const user = storage.getId();
const categoryApi = {
    getAll () {
        const url = `/categories`;
        return axiosClient.get(url);
    },

    get(id) {
        const url = `/category/${id}`;
        return axiosClient.get(url);
    },

    add (category) {
        const url = `/categories/add/${user.user._id}`;
        return axiosClient.post(url, category, { headers: { 'Authorization': `Bearer ${user.token}` } });
    },

    remove(id){
        const url = `/category/${id}/${user.user._id}`;
        return axiosClient.delete(url, {headers: { 'Authorization': `Bearer ${user.token}`}});
    },

    edit(id, newCate){
        const url = `/category/${id}/${user.user._id}`;
        return axiosClient.put(url, newCate, {headers: {'Authorization': `Bearer ${user.token}`}});
    }
}

export default categoryApi;