
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { UserIndex } from './pages/UserIndex.jsx'
import { userService } from './services/user.service.js'

function RouteGuard({ children }) {
  const loggedinUser = userService.getLoggedinUser()

  function isAllowed() { 
    return loggedinUser?.isAdmin
  }

  if (!isAllowed()) {
    return <Navigate to="/" />
  }

  return children
}

function App() {
  return (
    <Router>
      <div>
        <AppHeader />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/bug' element={<BugIndex />} />
            <Route path='/bug/:bugId' element={<BugDetails />} />
            <Route path='/user' element={<UserIndex />} />
            <Route path='/about' element={
              <RouteGuard>
                <AboutUs />
              </RouteGuard>
            } />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  )
}

export default App