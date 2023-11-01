import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderNavigation from './components/headerNavigation';
import Home from './pages/Home'
import Audience from './pages/Audience'
import Sports from './pages/sports'
import Medal from './pages/Medal'

function App() {
  return (
    <>
      <HeaderNavigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audience" element={<Audience />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/medal" element={<Medal />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
