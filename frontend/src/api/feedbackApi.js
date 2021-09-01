import { axiosClient } from './axiosClient';

const feedbackApi = {
    getAll () {
        const url = `/feedbacks`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },

    remove(id) {
    	const url = `/product/${id}`;
    	return axiosClient.delete(url);
    },

    add(fb) {
        const url = `/feedback/add`;
        return axiosClient.post(url, fb);
    }
    
}

export default feedbackApi;