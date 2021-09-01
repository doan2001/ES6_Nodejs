import { axiosClient } from './axiosClient';
import storage from './../storages/storage';
const user = storage.getId();

const slideApi = {
    getAll () {
        const url = `/slides`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/slide/${id}`;
        return axiosClient.get(url);
    },

    remove(id) {
    	const url = `/slide/${id}/${user.user._id}`;
    	return axiosClient.delete(url, {headers: { 'Authorization': `Bearer ${user.token}`}});
    },
    
    add(slide){
        const url = `/slide/add/${user.user._id}`;
        return axiosClient.post(url, slide, {headers: { 'Authorization': `Bearer ${user.token}` }});
    },

    update(slide, id){
        const url = `/slide/edit/${id}/${user.user._id}`;
        return axiosClient.put(url, slide, {headers: { 'Authorization': `Bearer ${user.token}`}})
    }
    
}

export default slideApi;