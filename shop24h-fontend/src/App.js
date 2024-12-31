
import routes from './routes';
import HeadersLogo from './Components/Pages/headersLogo';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameBread from './Components/Pages/nameBread';
import Admin from './Components/Admin/admin';
import { CartProvider } from './cartContext';
import LoginShop from './Components/login';
import SignupPage from './Components/signup';
import ChangeRoute from './Components/Pages/changeRoute';
function App() {
  return (
    <ChangeRoute />
  );
}

export default App;
