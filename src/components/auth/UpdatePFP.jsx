import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Client from "../services/api"

const UpdatePFP = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ profilePic: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await Client.put(`/auth/update-pfp/${id}`, {
        profilePic: formValues.profilePic,
      })
      alert("Profile Picture Updated!")
      navigate(`/profile/${id}`)
    } catch (error) {
      console.error("Error updating profile picture:", error)
    }
  }

  return (
    <div className="update-pfp-page">
      <h1>Update Profile Picture</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="profilePic">Image URL</label>
          <input
            onChange={(e) =>
              setFormValues({ ...formValues, profilePic: e.target.value })
            }
            name="profilePic"
            type="text"
            value={formValues.profilePic}
            placeholder="Paste your image link here"
            required
          />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default UpdatePFP
