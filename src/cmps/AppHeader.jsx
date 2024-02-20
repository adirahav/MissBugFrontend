
import { NavLink } from 'react-router-dom'
import { UserMsg } from './UserMsg'
import { Signin } from './Signin'
import { authService } from '../services/auth.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { useSelector } from 'react-redux'
import { loadUsers, setLoggedinUser } from '../store/actions/user.actions'
import { useEffect } from 'react'

export function AppHeader() {
  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

  const isAdmin = loggedinUser?.isAdmin
  const isLoggedin = loggedinUser !== null && loggedinUser !== undefined

  useEffect(() => {
    loadUsers()
  })

  return (
    <header className='app-header'>
      <div className='header-container'>
      <UserMsg />
      <section className="login-signup-container">
          <Signin />
      </section>
      <nav className='app-nav'>
        &nbsp;<NavLink to="/">Home</NavLink>
         | <NavLink to="/bug">Bugs</NavLink>
         {isAdmin && <>| <NavLink to="/user">Users</NavLink></>}
         {isLoggedin && <>| <NavLink to={`/user/${loggedinUser._id}`}>Profile</NavLink></>}
         | <NavLink to="/about">About</NavLink>
      </nav>
      <h1>&nbsp;Bugs are Forever</h1>
      </div>
    </header>
  )
}
