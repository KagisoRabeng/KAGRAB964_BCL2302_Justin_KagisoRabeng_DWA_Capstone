import React, { useState, useEffect } from "react";
import "./Podcasts.css"


export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setPodcasts(data));
  }, []);

  const [ShowDescription, setShowDescription] = useState(true)

  function Show() {
    setShowDescription (prevShowDescription => !prevShowDescription)
  }

  return (
    <div className="Middle-con">
      <div className="podcast-list">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card">
            {podcast.image && <img src={podcast.image} alt={podcast.title} />}
            <h2>{podcast.title}</h2>
            <h4>Genre: {podcast.genres}</h4>
            <h4>Seasons: {podcast.seasons}</h4>
            <p onClick={Show}>{ShowDescription === true ? `${podcast.description}`  : "Show Description"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
