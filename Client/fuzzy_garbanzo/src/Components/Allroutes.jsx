import React  from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import HomePage from './HomePage'
import NotFound from './NotFound'
import Details from './Details'
import SearchContent from './SearchContent'
import Favorite from './Favorite'
import ProfilePage from './ProfilePage'
import { useAuth } from '../Context/AuthContextProvider'
import ProtectedRoute from './ProtectedRoute'


const Allroutes = ({recipe}) => {
 
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/details/:id' element={<Details/>}/>
      <Route path='/search' element={<ProtectedRoute isAuth={isAuthenticated}><SearchContent recipe={recipe}/></ProtectedRoute>}/>
      <Route path='/fav' element={<ProtectedRoute isAuth={isAuthenticated}><Favorite/></ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute isAuth={isAuthenticated}><ProfilePage/></ProtectedRoute>}/>
      
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default Allroutes
