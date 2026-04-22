import { NavLink, useNavigate } from "react-router-dom"

const Nav = ({ setLoading, user, setUser }) => {
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setLoading(false)
  }

  return (
    <nav>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="user">Users</NavLink>
        {user && <NavLink to="/profile">Profile</NavLink>}
        {user && <NavLink to="/watchlist">Watchlist</NavLink>}
        {user && <NavLink to="/media">Media</NavLink>}
        {user && <NavLink to="/genres">Genres</NavLink>}

        {user ? (
          <button className="delete-btn-outline" onClick={logout}>
            Log out
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  )
}

export default Nav
