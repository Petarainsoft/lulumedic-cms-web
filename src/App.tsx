import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import MainPage from 'pages/main/MainPage';

import mainRoutes from 'routes/mainRoutes';
import authRoutes from 'routes/authRoutes';

import AuthRouter from 'routes/router/AuthRouter';

const routers = createBrowserRouter([
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: '/',
    element: (
      <AuthRouter>
        <MainPage />
      </AuthRouter>
    ),
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
