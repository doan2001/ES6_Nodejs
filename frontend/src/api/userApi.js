import { axiosClient } from './axiosClient';
import storage from './../storages/storage';
const userLocal = storage.getId();

const userApi = {
    getAll() {   
        const url = `/users/${userLocal.user._id}`;
        return axiosClient.get(url , { headers: {"Authorization" : `Bearer ${userLocal.token}`} } )// tất cả danh sách 
    },

    getAllUser(){
        const url = `/users`;
        return axiosClient.get(url);
    },

    get(id) {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },

    remove(id) {
    	const url = `/user/${id}/${userLocal.user._id}`;
    	return axiosClient.delete(url, {headers: { 'Authorization': `Bearer ${userLocal.token}` }});
    },
    
    userLogin (user) {
        const url = `/sign_in`;
        return axiosClient.post(url, user);
    },

    update(user, id){
        const url = `/user/${id}/${userLocal.user._id}`;
        return axiosClient.put(url, user, {headers: { 'Authorization': `Bearer ${userLocal.token}` }})
    },

    userSignup (user) {
        const url = `/signup`;
        return axiosClient.post(url, user);
    }
}

export default userApi;