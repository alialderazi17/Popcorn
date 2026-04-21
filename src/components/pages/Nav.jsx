import { NavLink } from "react-router-dom"

const Nav = ({ user, setUser }) => {
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <nav>
      <div>
        <NavLink to="/">Home</NavLink>

        {user && <NavLink to="/profile">Profile</NavLink>}
        {user && <NavLink to="/watchlist">Watchlist</NavLink>}

        <NavLink to="/about">About</NavLink>

        {user ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  )
}

export default Nav
