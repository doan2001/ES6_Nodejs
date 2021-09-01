import { axiosClient } from './axiosClient';
import storage from './../storages/storage';
const user = storage.getId();

const commentApi = {
    add(comment){
        const url = `/comment/add`;
        return axiosClient.post(url, comment);
    },

    getAll(){
        const url = `/comments`;
        return axiosClient.get(url);
    },

    remove(id){
        const url = `/comment/${id}/${user.user._id}`;
        return axiosClient.delete(url, {headers: { 'Authorization': `Bearer ${user.token}`}});
    }
}

export default commentApi;