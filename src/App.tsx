import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import MainPage from 'pages/main/MainPage';

import mainRoutes from 'routes/mainRoutes';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: mainRoutes,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
