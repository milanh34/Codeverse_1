

import Landing from './pages/landing/Landing'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
