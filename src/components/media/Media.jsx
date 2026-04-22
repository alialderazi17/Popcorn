import { useState } from "react"
import Movies from "./Movies.jsx"
import Tv from "./Tv.jsx"

const Home = () => {
  const [type, setType] = useState("movies")

  return (
    <div>
      <div className="filter-buttons">
        <button
          className={type === "movies" ? "active" : ""}
          onClick={() => setType("movies")}
        >
          Movies
        </button>
        <button
          className={type === "tv" ? "active" : ""}
          onClick={() => setType("tv")}
        >
          TV Shows
        </button>
      </div>

      <div>{type === "movies" ? <Movies /> : <Tv />}</div>
    </div>
  )
}

export default Home
