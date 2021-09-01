
const Navbar = {
    render () {
        return /*html*/ `
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active fs-2" aria-current="page" href="#">
                            <span data-feather="home"></span>
                            Quản trị
                        </a>
                    </li>
                </ul>

                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <a class="link-secondary" href="" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h6>
                <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <a class="nav-link" href="/#/admin_product">
                            <span data-feather="file-text"></span>
                            Product
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/#/admin_slide">
                            <span data-feather="file-text"></span>
                            Slide
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/#/admin_category">
                            <span data-feather="file-text"></span>
                            Category
                        </a>
                    </li>
                    
                </ul>
                </div>
            </nav>
        `;
    }
}

export default Navbar;