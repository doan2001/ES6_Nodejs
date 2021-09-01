import Header from './../components/Header';
import { $, resetRender } from './../utils';

import productApi from './../api/productApi';
import cartApi from './../api/cartApi';

const addToCart = (user, btnAddCart, valueQuantity) => {

    const findProduct = async (idPrd) => {
        const {data: product} = await productApi.get(idPrd);
        const productCart = {
            userId: user._id,
            prdId: product._id,
            name: product.name,
            price: product.price,
            sale: product.sale,
            // photo: product.photo
        }
        return productCart;
    }

    const addToCart = async (productClicked, idPrd) => {
        const {data: listCart} = await cartApi.getAll();

        if(listCart.length <= 0){
            productClicked.quantity = valueQuantity;
            try{
                const addFinish = await cartApi.add(productClicked);
                if(addFinish){
                    resetRender(Header, '.header');
                }
            }catch(error){

            }
        } else {
            const prdUpdate = listCart.find(prd => prd.prdId == idPrd && user._id == prd.userId);
            if(prdUpdate){
                prdUpdate.quantity += valueQuantity;
                try{
                    const updateFinish = cartApi.updateCart(prdUpdate, prdUpdate._id);
                    if(updateFinish){
                        resetRender(Header, '.header');
                    }
                }catch(error){

                }
            } else {
                productClicked.quantity = valueQuantity;
                try{
                    const addFinish = await cartApi.add(productClicked);
                    if(addFinish){
                        resetRender(Header, '.header');
                    }
                }catch(error){

                }
            }


        }
    }

    // handle cart
    if(Array.isArray(btnAddCart)){
        btnAddCart.forEach(function (product) {
            product.onclick = async function () {      
                if(user !== undefined) {
                    let idPrd = this.dataset.id;
                    const productClicked = await findProduct(idPrd);
                    addToCart(productClicked, idPrd);


                } else {
                    window.location.href = "/#/sign-in";
                }
            } 
        })
    }
}

export default addToCart;