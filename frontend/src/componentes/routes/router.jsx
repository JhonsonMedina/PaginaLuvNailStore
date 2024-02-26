import { createBrowserRouter } from 'react-router-dom';
import Login from '../login/login.jsx';
import Root from '.././../root'
import ErrorPage from '../../error-page.jsx';
import Registro from '../registro/registro.jsx';




const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/Registro',
      element: <Registro />
    },
   
    
  ]);
  
  export default router;