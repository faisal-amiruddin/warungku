import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import TambahMenu from './pages/TambahMenu'
function App() {
  return (
    <>
      <Router>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tambah" element={<TambahMenu />} />
            </Routes>
          </main>
      </Router>
    </>
  )
}

export default App
