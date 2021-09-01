import { axiosClient } from './axiosClient';
import storage from './../storages/storage';
const user = storage.getId();

const postApi = {
    getAll() {
        const url = `/posts`;
        return axiosClient.get(url);
    },

    add(post){
        const url = `/post/add/${user.user._id}`;
        return axiosClient.post(url, post, {headers: { 'Authorization': `Bearer ${user.token}` }});
    },

    get(id){
        const url = `/post/${id}`;
        return axiosClient.get(url);
    }
}

export default postApi;