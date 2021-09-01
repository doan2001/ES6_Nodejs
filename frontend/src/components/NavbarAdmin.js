import storage from './../storages/storage';

const NavbarAdmin = {
    async render () {
        const user = storage.getId();
        if(user){
            if(user.user.role != 1){
                window.location.href = '/';    
            }else{
                return /*html*/ `
                    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow fs-3">
                        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
                        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
                        <ul class="navbar-nav px-3">
                            <li class="nav-item text-nowrap">
                            <a class="nav-link" href="#">Sign out</a>
                            </li>
                        </ul>
                    </header>
                    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse fs-4">
                        <div class="position-sticky pt-3">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/#/admin">
                                        <span data-feather=""></span>
                                        Dashboard
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/admin_product">
                                        <span data-feather="file"></span>
                                        Product
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/admin_slide">
                                        <span data-feather="shopping-cart"></span>
                                        Slide
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/admin_category">
                                        <span data-feather="users"></span>
                                        Category
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/admin_comment">
                                        <span data-feather="bar-chart-2"></span>
                                        Comment
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/admin_feedback">
                                        <span data-feather="layers"></span>
                                        Feedback
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/admin_user">
                                        <span data-feather="layers"></span>
                                        User
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/admin_cate-post">
                                        <span data-feather="layers"></span>
                                        Category Post
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/admin_post">
                                        <span data-feather="layers"></span>
                                        Post
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/admin_order">
                                        <span data-feather="layers"></span>
                                        Order
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                `;
            }
        } else {
            window.location.href = '/';
        }


        
    },

    async afterRender(){
        
    }

    
}

export default NavbarAdmin;