import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import AppLayout from './layout.tsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import HomePage from './pages/HomePage.tsx';
import UserPage from './pages/UserPage.tsx';
import BlogPage from './pages/BlogPage.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children:[
      {
        index:true,
        element: <HomePage/>
      },

      {
        path: "users",
        element: <UserPage/>
      },

       {
        path: "blogs",
        element: <BlogPage/>
      },

    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
) 
