import {Route, Routes} from "react-router-dom"
import './App.css'

import Home from './components/Home'
import { Input } from './components/Input'
import { Scheduling } from './components/Scheduling'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/input' element={<Input/>}/>
        <Route path='/scheduling' element={<Scheduling/>}/>
      </Routes>
    </>
  )
}

export default App
