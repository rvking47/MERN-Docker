import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserList from './components/UserList'
import UserCreate from './components/UserCreate'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<UserCreate />} />
      </Routes>
    </div>
  )
}

export default App