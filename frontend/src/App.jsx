import SignInUser from './pages/signup-in/user/signin/SignInUser'
import SignUpUser from './pages/signup-in/user/signup/SignUpUser'
import SignInNgo from './pages/signup-in/ngo/signin/SignInNgo'
import SignUpNgo from './pages/signup-in/ngo/signup/SignUpNgo'
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
      <Route path="/signinngo" element={<SignInNgo />} />
      <Route path="/signupngo" element={<SignUpNgo />} />
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
