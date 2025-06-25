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


const router = createBrowserRouter([
  {path:"/",
    element:<Login />
  },

  {path:"/Signup",
    element:<Signup />
  },

  {path:"/Dashboard",
    element:<RoleProtectedRoute allowedRoles={["user"]} />,
    children: [{
      index: true,
      element:<Dashboard />

    },
    ],
  },
  {
        path: "/AdminDashboard",
        element: <RoleProtectedRoute allowedRoles={["admin"]} />,

        children:[
          {
            index:true,
            element:<AdminDashboard/>,
          }
        ],
      },

]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
      </AuthProvider>
  </StrictMode>,
)
