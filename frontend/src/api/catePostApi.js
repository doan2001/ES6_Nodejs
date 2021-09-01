import { axiosClient } from './axiosClient';
import storage from './../storages/storage';

const user = storage.getId();

const catePostApi = {
    getAll() {
        const url = `/cate-post`;
        return axiosClient.get(url);
    },

    get(id){
        const url = `/cate-post/${id}`;
        return axiosClient.get(url);
    },

    add(catePost) {
        const url = `/cate-post/add/${user.user._id}`;
        return axiosClient.post(url, catePost, {headers: { 'Authorization': `Bearer ${user.token}` }});
    },

    remove(id){
        const url = `/cate-post/${id}/${user.user._id}`;
        return axiosClient.delete(url, {headers: { 'Authorization': `Bearer ${user.token}`}});
    },

    update(newCate, id) {
        const url = `/cate-post/${id}/${user.user._id}`;
        return axiosClient.put(url, newCate, {headers: { 'Authorization': `Bearer ${user.token}` }});
    }
}

export default catePostApi;