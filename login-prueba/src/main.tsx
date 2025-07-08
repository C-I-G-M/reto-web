import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/login.tsx';
import Signup from './routes/signup.tsx';
import Dashboard from './routes/Dashboard.tsx';
import { AuthProvider } from './Auth/AuthProvider.tsx';
import "./App.css";
import AdminDashboard from './routes/AdminDashboard.tsx';
import RoleProtectedRoute from './routes/RoleProtectedRoutes.tsx';
import TablaSolicitudUsuario from './routes/TablaSolicitudUsuario.tsx';
import type { Solicitud } from './types/types.ts';


const router = createBrowserRouter([
  {path:"/",
    element:<Login />
  },

  {path:"/Signup",
    element:<Signup />
  },

  {path:"/Dashboard",
   /* element:<RoleProtectedRoute allowedRoles={["user"]} />,
    children: [{
      index: true,
      element:<Dashboard />

    },
    ],*/
    element:<Dashboard />
  },
  {
        path: "/AdminDashboard",
        /*element: <RoleProtectedRoute allowedRoles={["admin"]} />,

        children:[
          {
            index:true,
            element:<AdminDashboard/>,
          }
        ],*/
         element:<AdminDashboard />
      },
  {path:"/TablaSolicitudUsuario",
    /*element: <RoleProtectedRoute allowedRoles={["user"]} />,
    
    children:[
          {
            index:true,
            element:<AdminDashboard/>,
          }
       ],*/
        element:<TablaSolicitudUsuario solicitudes={[]} onEdit={function (solicitud: Solicitud): void {
          throw new Error('Function not implemented.');
        } } onDelete={function (id: number): void {
          throw new Error('Function not implemented.');
        } } />
}

]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
      </AuthProvider>
  </StrictMode>,
)
