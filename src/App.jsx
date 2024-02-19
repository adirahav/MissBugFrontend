
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { UserIndex } from './pages/UserIndex.jsx'
import { userService } from './services/user.service.js'
import { UserDetails } from './pages/UserDetails.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'

function UserIndexRouteGuard({ children }) {
  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

  function isAdmin() { 
    return loggedinUser?.isAdmin
  }

  if (!isAdmin()) {
    return <Navigate to="/" />
  }

  return children
}

function UserDetailsRouteGuard({ children }) {
  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

  function isLoggedin() { 
    return loggedinUser !== null && loggedinUser !== undefined
  }

  if (!isLoggedin()) {
    return <Navigate to="/" />
  }

  return children
}

function App() {
  return (
    <Provider store={store}> 
      <Router>
        <div>
          <AppHeader />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/bug' element={<BugIndex />} />
              <Route path='/bug/:bugId' element={<BugDetails />} />
              <Route path='/user' element={<UserIndexRouteGuard><UserIndex /></UserIndexRouteGuard>} />
              <Route path='/user/:userId' element={<UserDetailsRouteGuard><UserDetails /></UserDetailsRouteGuard>} />
              <Route path='/about' element={<AboutUs />} />
            </Routes>
          </main>
          <AppFooter />
        </div>
      </Router>
    </Provider>
  )
}

export default App