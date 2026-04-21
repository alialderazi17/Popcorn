import { Link } from "react-router-dom"

const Profile = () => {
  return (
    <div className="profile page">
      <h1>Profile Page</h1>
      <div className="description">
        <div className="profile-img">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Profile-pic"
          />
        </div>

        <p>Username:</p>
        <p>Email:</p>

        <Link to="/update-password">
          <button>Update Password</button>
        </Link>
      </div>
    </div>
  )
}
export default Profile
