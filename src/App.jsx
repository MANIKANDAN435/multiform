
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Personaldata from './Personaldata'
import Education from './Education'
import Workdetails from './Workdetails'
import Reviewalldetails from './Reviewalldetails' 
import Showlogin from './Showlogin'
import Login from './Createlogin'
import Signup from './Sign'
import Edit from './Edit'
import './App.css'

const App = () => {
  return (   

    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Showlogin/>} />
      <Route path='/edit' element={<Edit/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='signup' element={<Signup/>} />
      <Route  path='/personaldata' element={<Personaldata/>} />
      <Route  path='/education' element={<Education/>} />
      <Route  path='/workdetails' element={<Workdetails/>} />
      <Route  path='/reviewdetails' element={<Reviewalldetails/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App