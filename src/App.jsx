
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import ProtectedAuth from './components/auth/ProtectedAuth'

function App() {
  return (
    <section>
      <Routes>
        <Route path='/' element={<Home />}/>

        <Route element={<ProtectedAuth />}>
          <Route path='/pokedesk' element={<Pokedex />} />
        </Route>
        
      </Routes>    
    </section>
  )
}

export default App
