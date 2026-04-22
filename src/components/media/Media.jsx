import { useState } from 'react'
import Movies from './Movies.jsx'
import Tv from './Tv.jsx'

const Home = () => {
  const [type, setType] = useState('movies')

  return (
    <div>
      <div>
        <button onClick={() => setType('movies')}>Movies</button>
        <button onClick={() => setType('tv')}>TV Shows</button>
      </div>

      <div>{type === 'movies' ? <Movies /> : <Tv />}</div>
    </div>
  )
}

export default Home
