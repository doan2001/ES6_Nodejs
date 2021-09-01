const $$ = selector => {
	const elements = document.querySelectorAll(selector);
	return elements.length == 1 ? elements[0] : [...elements];
}


// xóa sản phẩm
const btnRemove = $$('.btn-danger');
const formDelete = $$('.form-delete');
btnRemove.forEach(btn => {
	btn.addEventListener('click', () => {
		const id = btn.dataset.id;
		const question = confirm('Bạn chắc chắn muốn xóa ?');
		if(question) {
			formDelete.action = `/api/product/${id}?_method=DELETE`;
			formDelete.submit();
		}
	})
})