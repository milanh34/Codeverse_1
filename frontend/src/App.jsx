import SignInUser from './pages/signup-in/user/signin/SignInUser'
import SignUpUser from './pages/signup-in/user/signup/SignUpUser'
import Landing from './pages/landing/Landing'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signinuser" element={<SignInUser />} />
      <Route path="/signupuser" element={<SignUpUser />} />
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
