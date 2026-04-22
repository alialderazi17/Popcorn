import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="neon-title">
            Cue the Popcorn, <br />
            <span>we'll handle the rest!</span>
          </h1>
          <p className="hero-subtitle">
            Your ultimate space to discover, track, and share your favorite
            movies and shows. No clutter. No overwhelm. Just pure entertainment.
          </p>
          <div className="hero-btns">
            <Link to="/media" className="main-btn">
              Browse Media
            </Link>
            <Link to="/watchlist" className="main-btn">
              My Watchlist
            </Link>
          </div>
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <div className="icon">🎬</div>
          <h3>Discover</h3>
          <p>Find hidden gems and trending series effortlessly.</p>
        </div>
        <div className="feature-card">
          <div className="icon">📊</div>
          <h3>Track</h3>
          <p>Keep your watchlist personalized and fresh.</p>
        </div>
        <div className="feature-card">
          <div className="icon">✨</div>
          <h3>Experience</h3>
          <p>A smooth, intuitive interface built for cinephiles.</p>
        </div>
      </section>
    </div>
  )
}

export default Home
