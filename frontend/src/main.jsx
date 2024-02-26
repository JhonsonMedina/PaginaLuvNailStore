import React from 'react';
import ReactDOM from 'react-dom/client';

import routes from '../../frontend/src/componentes/routes/router';

import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
);
