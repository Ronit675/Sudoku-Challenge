import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Loginpage from '../pages/Login/Loginpage'
import SignupPage from '../pages/Signup/SignupPage'
import Homepage from '../pages/Home/Homepage'
import Playroom from '../pages/Playroom/Playroom'

function App() {
  const router = createBrowserRouter(
  [
    {
      path: "/",
      element: 
      <div> 
        <Homepage/>
      </div>
    },
    {
      path: "/login",
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
    {
      path: "/game",
      element: 
      <div> 
        <Playroom/>
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