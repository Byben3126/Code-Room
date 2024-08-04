
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'; 
import { ResourceProvider } from './context/ResourceContext'; 
import MainLayout from './pages/mainLayout'
import Register from './pages/register'
import Login from './pages/Login'

import TutorialList from './components/tutorialList'
import Tutorial from './components/tutorial'
import MyTutorialList from './components/myTutorialList'
import Account from './components/account'
import FormTutorial from './components/formTutorial'

function App() {

  return (
  <AuthProvider>
    <ResourceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<TutorialList />} />
            <Route path="tutorial" element={<Tutorial />} />
            <Route path="mytutorials" element={<MyTutorialList />} />
            <Route path="account" element={<Account />} />
            <Route path="tutorialedit" element={<FormTutorial />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ResourceProvider>
  </AuthProvider>
  )
}

export default App
