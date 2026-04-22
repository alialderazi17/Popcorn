import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

const Profile = ({ user }) => {
  const { id } = useParams()
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    const getProfile = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `https://popcorn-be.onrender.com/user/${id}`
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

  const isOwner = user && profileData.id === user.id

  return (
    <div className="profile page">
      <h1>{isOwner ? "My Profile" : `${profileData.username}'s Profile`}</h1>
      <div className="description">
        <div className="profile-img">
          <img
            src={
              profileData.profilePic ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Profile-pic"
          />
        </div>

        <p>
          {" "}
          <strong>Username: </strong> {profileData.username}
        </p>

        {isOwner && (
          <p>
            {" "}
            <strong>Email: </strong> {profileData.email}
          </p>
        )}

        <h4>
          <Link to={isOwner ? `/watchlist` : `/watchlist/${profileData._id}`}>
            {profileData.username}'s List
          </Link>
        </h4>

        {isOwner && (
          <Link to={`/update-password/${profileData.id}`}>
            <button>Update Password</button>
          </Link>
        )}
        {isOwner && (
          <Link to={`/update-pfp/${profileData._id || profileData.id}`}>
            <button className="edit-btn">Change Photo</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Profile
