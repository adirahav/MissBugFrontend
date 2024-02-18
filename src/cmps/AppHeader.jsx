
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserMsg } from './UserMsg'
import { Signin } from './Signin'
import { userService } from '../services/user.service'
import { authService } from '../services/auth.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

export function AppHeader() {
  const [loggedinUser, setLoggedinUser] = useState(userService.getLoggedinUser())

  async function onLogin(credentials) {
    console.log(credentials)
    try {
        const user = await authService.login(credentials)
        setLoggedinUser(user)
        showSuccessMsg(`Welcome ${user.fullname}`)
    } catch (err) {
        console.log('Cannot login :', err)
        showErrorMsg(`Cannot login`)
    }
  }

  async function onSignup(credentials) {
      console.log(credentials)
      try {
          const user = await authService.signup(credentials)
          setLoggedinUser(user)
          showSuccessMsg(`Welcome ${user.fullname}`)
      } catch (err) {
          console.log('Cannot signup :', err)
          showErrorMsg(`Cannot signup`)
      }
      // add signup
  }

  async function onLogout() {
      console.log('logout');
      try {
          await authService.logout()
          setLoggedinUser(null)
      } catch (err) {
          console.log('can not logout');
      }
      // add logout
  }

  function isAllowed() {
      return loggedinUser?.isAdmin
  }

  return (
    <header className='app-header '>
      <div className='header-container'>
      <UserMsg />

      <section className="login-signup-container">
          {!loggedinUser && <Signin onLogin={onLogin} onSignup={onSignup} />}

          {loggedinUser && <div className="user-preview">
              <h3>Hello {loggedinUser.fullname}
                  <button onClick={onLogout}>Logout</button>
              </h3>
          </div>}
      </section>


      <nav className='app-nav'>
        &nbsp;<NavLink to="/">Home</NavLink> | <NavLink to="/bug">Bugs</NavLink> | <NavLink to="/user">Users</NavLink> | <NavLink to="/about">About</NavLink>
      </nav>
      <h1>&nbsp;Bugs are Forever</h1>
      </div>
    </header>
  )
}
