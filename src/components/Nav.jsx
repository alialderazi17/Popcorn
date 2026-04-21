import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav>
      <Link to="/about">About</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  )
}

export default Nav
