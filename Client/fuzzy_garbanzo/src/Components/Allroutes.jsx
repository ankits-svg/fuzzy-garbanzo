import React  from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import HomePage from './HomePage'
import NotFound from './NotFound'
import Details from './Details'

const Allroutes = ({recipe}) => {

    

  return (
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<HomePage recipe={recipe}/>}/>
      <Route path='/details/:id' element={<Details recipe={recipe}/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default Allroutes
