import Base from './components/base';
import HomePage from './components/home-page';
import LoginPage from './components/login-page';
import RegistrationPage from './components/registration-page';

const routes = {
    //base component (wrapper for the whole application).
    component: Base,
    childRoutes: [
        {
            path:'/',
            component: HomePage
        },
        {
            path: '/login', coponent
            component: LoginPage
        },
        {
            path: '/registration',
            component: RegistrationPage
        }
    ]
};

export default routes;
