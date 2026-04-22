import { NavLink, useNavigate } from 'react-router-dom'

const Nav = ({ user, setUser }) => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <nav>
      <div>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/user'>Users</NavLink>
        {user && <NavLink to='/profile'>Profile</NavLink>}
        {user && <NavLink to='/watchlist'>Watchlist</NavLink>}
        {user && <NavLink to='/media'>Media</NavLink>}
        {user && <NavLink to='/genres'>Genres</NavLink>}
        <NavLink to='/about'>About</NavLink>

        {user ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/login'>Login</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
