import productApi from './../../api/productApi';
import { $, resetRender } from './../../utils';
const dashboard = {
    async render (){

        const { data : {data : products} } = await productApi.getAll();

        return /*html*/ `
        <div class="container-fluid">
            <div class="row row-table">
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    admin
                </main>
            </div>
        </div>
        `;
    },

    afterRender() {
        // const main = $('.main').style.backgroundColor = '#fff';
    }
}


export default dashboard;