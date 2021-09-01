import feedbackApi from './../../../api/feedbackApi';

const FeedbackAdmin = {
    async render () {
        const {data : feedbacks} = await feedbackApi.getAll();

        return /*html */ `
            <div class="container-fluid mt-4">
                <div class="row row-table">
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <h2>Danh sách slide</h2>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Nội dung</th>
                                    <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   ${
                                        feedbacks.map((db, index) => {
                                            return /*html*/ `
                                                <tr>
                                                    <td>${index + 1}</td>
                                                    <td>${db.name}</td>
                                                    <td>${db.email}</td>
                                                    <td>${db.phone}</td>
                                                    <td>${db.content}</td>
                                                    <td>
                                                        <a class="btn btn-primary fs-4" href="">Trả lời</a>
                                                    </td>
                                                </tr>
                                            `;
                                        }).join('')
                                   }

                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        `;
    }
}

export default FeedbackAdmin;