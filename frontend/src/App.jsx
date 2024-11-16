
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Navbar from "./components/shared/Navbar"
import Home from './components/Home'



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  // {
  //   path: "/jobs",
  //   element: <Jobs />
  // },
  // {
  //   path: "/description/:id",
  //   element: <JobDescription />
  // },
  // {
  //   path: "/browse",
  //   element: <Browse />
  // },
  // {
  //   path: "/profile",
  //   element: <Profile />
  // },
  // // admin ke liye yha se start hoga
  // {
  //   path:"/admin/companies",
  //   element: <ProtectedRoute><Companies/></ProtectedRoute>
  // },
  // {
  //   path:"/admin/companies/create",
  //   element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  // },
  // {
  //   path:"/admin/companies/:id",
  //   element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  // },
  // {
  //   path:"/admin/jobs",
  //   element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  // },
  // {
  //   path:"/admin/jobs/create",
  //   element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  // },
  // {
  //   path:"/admin/jobs/:id/applicants",
  //   element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  // },

])

function App() {
  

  return (
    <>
     <RouterProvider router={appRouter}/>
    </>
  )
}

export default App