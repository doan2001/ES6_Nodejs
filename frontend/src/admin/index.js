import DashboardAdmin from './pages/Dashboard';

const routesAdmin = (url) => {
    console.log(url);
    switch(url) {
        case `/admin`:
            DashboardAdmin.render();
        break;
    }

    return '/admin_product';
}

export default routesAdmin;