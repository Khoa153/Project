import HomePage from "./Components/Pages/homePage";
import PageIphone from "./Components/Pages/iphone";
import Macbook from "./Components/Pages/macbook";
import NotFound from "./Components/Pages/notFound";
import Total from "./Components/Pages/totalProduct";
import Login from './Components/login'
import SignupPage from "./Components/signup";
import LoginAdmin from "./Components/loginAdmin";
import AdminProduct from './Components/Admin/admin'
import Airpod from "./Components/Pages/airpod";

import Macmini from "./Components/Pages/macmini";
import CateIphone from './Components/Admin/CateIphone/cateIphone'
import CateMacbook from './Components/Admin/CateMacbook/cateMacbook'
import CateAirpod from './Components/Admin/CateAirpod/cateAirpod'
import CateMacmini from './Components/Admin/CateMacmini/cateMacmini'
import PriceTotal from "./Components/Pages/total";
import Product from './Components/Pages/product'

const routes = [
    {
        path: '/',
        element: <HomePage />,
        name: 'Home'
    },
    {
        path: '/Product',
        element: <Product />,
        name: 'Product'
    },
    {
        path: '/Iphone',
        element: <PageIphone />,
        name: 'Iphone',
    },
    {
        path: '/Macbook',
        element: <Macbook />,
        name: 'Macbook'
    },
    {
        path: '/Card',
        element: <PriceTotal />,
        name: 'Card'
    },
    {
        path: '/Airpod',
        element: <Airpod />,
        name: 'Airpod'
    },

    {
        path: '/Macmini',
        element: <Macmini />,
        name: 'Macmini'
    },

    {
        path: '/Signup',
        element: <SignupPage />,
        name: 'Signup'
    },
    {
        path: '/Login',
        element: <Login />,
        name: 'Login'
    }
    ,
    {
        path: '/LoginAdmin',
        element: <LoginAdmin />,
        name: 'LoginAdmin'
    },
    {
        path: '/Admin',
        element: <AdminProduct />,
        name: 'AdminProduct'
    },
    {
        path: '/CateIphone',
        element: <CateIphone />,
        name: 'CateIphone'
    }
    ,
    {
        path: '/CateMacbook',
        element: <CateMacbook />,
        name: 'CateMacbook'
    }
    ,
    {
        path: '/CateAirpod',
        element: <CateAirpod />,
        name: 'CateAirpod'
    }
    ,
    {
        path: '/CateMacmini',
        element: <CateMacmini />,
        name: 'CateMacmini'
    }
    ,
    {
        path: '*',
        element: <NotFound />
    }
]

export default routes;