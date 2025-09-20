import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
