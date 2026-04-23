import { useState } from "react"
import Movies from "./Movies.jsx"
import Tv from "./Tv.jsx"

const Home = () => {
  const [type, setType] = useState("movies")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="media-hub-container">
      <h1 className="neon-title">
        Explore <span>Media</span>
      </h1>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder={`Search ${type === "movies" ? "movies" : "TV shows"}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="neon-search"
        />
      </div>

      <div className="filter-buttons">
        <button
          className={type === "movies" ? "active" : ""}
          onClick={() => {
            setType("movies")
            setSearchQuery("")
          }}
        >
          Movies
        </button>
        <button
          className={type === "tv" ? "active" : ""}
          onClick={() => {
            setType("tv")
            setSearchQuery("")
          }}
        >
          TV Shows
        </button>
      </div>

      <div>
        {type === "movies" ? (
          <Movies searchQuery={searchQuery} />
        ) : (
          <Tv searchQuery={searchQuery} />
        )}
      </div>
    </div>
  )
}

export default Home
