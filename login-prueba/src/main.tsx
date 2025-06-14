import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/login.tsx';
import Signup from './routes/signup.tsx';
import Dashboard from './routes/Dashboard.tsx';
import ProtectedRoute from './routes/protectedroute.tsx';
import { AuthProvider } from './Auth/AuthProvider.tsx';

const router = createBrowserRouter([
  {path:"/",
    element:<Login />
  },

  {path:"/Signup",
    element:<Signup />
  },

  {path:"/",
    element:<ProtectedRoute />,
    children: [{
      path:"/Dashboard",
      element:<Dashboard />

    }]
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
      </AuthProvider>
  </StrictMode>,
)
