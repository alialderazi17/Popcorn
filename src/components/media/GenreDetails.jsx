import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const GenreDetails = () => {
  const { id } = useParams()
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    const getGenre = async () => {
      try {
        const response = await axios.get(
          `https://popcorn-be.onrender.com/genres/${id}`
        )
        setGenre(response.data)
      } catch (error) {
        console.error('Error getting genre details:', error.message)
      }
    }
    getGenre()
  }, [id])
  if (!genre) return <div>Loading...</div>

  return (
    <div className='details-page'>
      <div className='genre-header'>
        <h1>{genre.name}</h1>
        <p className='genre-description'>{genre.description}</p>
      </div>

      <hr />

      <div className='media-container'>
        <h2>Explore {genre.name} Titles</h2>
        <div className='media-grid'>
          {genre.media && genre.media.length > 0 ? (
            genre.media.map((item) => (
              <Link
                to={`/${item.mediaType}/${item._id}`}
                key={item._id}
                className='media-card'
              >
                <img src={item.image} alt={item.title} />
                <div className='media-info'>
                  <h3>{item.title}</h3>
                  <p>Rating: {item.rating}</p>
                  <span className='badge'>{item.mediaType}</span>
                </div>
              </Link>
            ))
          ) : (
            <p>No titles found for this genre yet.</p>
          )}
        </div>
        <NavLink to='/genres' className='back-button'>
          <button className='back-button'>Back to Genres</button>
        </NavLink>
      </div>
    </div>
  )
}

export default GenreDetails
