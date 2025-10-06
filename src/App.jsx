import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Loginpage from '../pages/Login/Loginpage'
import SignupPage from '../pages/Signup/SignupPage'
function App() {
  const router = createBrowserRouter(
  [
    {
      path: "/",
      element: 
      <div> 
        <Loginpage/>
      </div>
    },
    {
      path: "/signup",
      element: 
      <div> 
        <SignupPage/>
      </div>
    },
  ]
)
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App