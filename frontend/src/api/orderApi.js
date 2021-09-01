import { axiosClient } from './axiosClient';
import storage from './../storages/storage';

const user = storage.getId();

const orderApi = {
    get(id) {
        const url = `/order/${id}`;
        return axiosClient.get(url);
    },

    add (order) {
        const url = `/order/add`;
        return axiosClient.post(url, order);
    },

    addDetail (order) {
        const url = `/order_detail/add`;
        return axiosClient.post(url, order)
    },

    getAllOrder() {
        const url = `/orders`;
        return axiosClient.get(url);
    },

    getAllOrderDetail() {
        const url = `/orders_detail`;
        return axiosClient.get(url);
    },

    updateOrderDetail(newOrder, id){
        const url = `/orders_detail/edit/${id}/${user.user._id}`;
        return axiosClient.put(url, newOrder, {headers: { 'Authorization': `Bearer ${user.token}` }})
    }


}

export default orderApi;