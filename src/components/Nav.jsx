import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <div>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink to='/watchlist'>Watchlist</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/media'>Media</NavLink>
        <NavLink to='/genres'>Genres</NavLink>
      </div>
    </nav>
  )
}

export default Nav
