import { $ } from './../utils';
import productApi from './../api/productApi';
import SearchResult from './../pages/SearchResultPage';

const HeaderMainSearch = {
    render() {
        return /*html */ `
            <form action="" class="form-search" method="GET">
                <input type="text" placeholder="Tìm kiếm..." class="input-search" name="q">
                <button class="btn-search">Tìm kiếm</button>
            </form>
        `;
    },

    async afterRender() {
        const { data: dataPrd } = await productApi.getAll();
        const btnSearch = $('.form-search');

        btnSearch.addEventListener('submit', async (e) => {
            e.preventDefault();
            const valueSearch = $('.input-search').value.toLowerCase().trim();
            if(valueSearch){
                window.location.href= `/#/search/${valueSearch}`;
                sessionStorage.setItem('key', JSON.stringify(valueSearch));
            } else {
                alert('Cần nhập giá trị tìm kiếm !')
            }
            
        })
    }
}

export default HeaderMainSearch;