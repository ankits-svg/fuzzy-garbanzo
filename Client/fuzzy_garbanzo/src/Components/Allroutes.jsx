import React  from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import HomePage from './HomePage'
import NotFound from './NotFound'
import Details from './Details'
import SearchContent from './SearchContent'
import Favorite from './Favorite'

const Allroutes = ({recipe}) => {

    

  return (
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/details/:id' element={<Details/>}/>
      <Route path='/search' element={<SearchContent recipe={recipe}/>}/>
      <Route path='/fav' element={<Favorite/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default Allroutes
