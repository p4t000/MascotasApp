import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MascotasPage from './pages/MascotasPage'
import MascotasForm from './components/MascotasForm'
import MascotasList from './components/MascotasList'


function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Mascotas" element={<MascotasPage />}>
            <Route path="formulario" element={<MascotasForm />} />
            <Route path="listado" element={<MascotasList />} />
          </Route>
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
