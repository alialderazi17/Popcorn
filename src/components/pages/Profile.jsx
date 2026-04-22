import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

const Profile = ({ user }) => {
  const { id } = useParams()
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    const getProfile = async () => {
      const targetId = id || user?.id || user?._id
      if (targetId) {
        try {
          const response = await axios.get(
            `https://popcorn-be.onrender.com/user/${targetId}`
          )
          setProfileData(response.data)
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      } else {
        setProfileData(user)
      }
    }
    getProfile()
  }, [id, user])

  if (!profileData)
    return (
      <div className="profile page">
        <h1>Loading...</h1>
      </div>
    )

  const isOwner =
    user &&
    (profileData.id === user.id ||
      profileData._id === user.id ||
      profileData._id === user._id)

  return (
    <div className="profile page">
      <h1>{isOwner ? "My Profile" : `${profileData.username}'s Profile`}</h1>
      <div className="description">
        <div className="profile-img">
          {console.log(profileData.profilePic)}
          <img src={profileData.profilePic} alt="Profile-pic" />
        </div>

        <p>
          {" "}
          <strong> </strong> {profileData.username}
        </p>

        <Link to={isOwner ? `/watchlist` : `/watchlist/${profileData._id}`}>
          <button className="edit-btn-outline">
            {profileData.username}'s List
          </button>{" "}
          <br />
        </Link>

        {isOwner && (
          <Link to={`/update-password/${profileData.id}`}>
            <button className="edit-btn-outline">Update Password</button>
          </Link>
        )}
        {isOwner && (
          <Link to={`/update-pfp/${profileData._id || profileData.id}`}>
            <button className="edit-btn-outline">Change Photo</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Profile
