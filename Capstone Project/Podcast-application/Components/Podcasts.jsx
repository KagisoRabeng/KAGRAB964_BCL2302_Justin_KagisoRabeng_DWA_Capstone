import React, { useState, useEffect } from "react";

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setPodcasts(data));
  }, []);

  return (
    <div className="Middle-con">
      <div className="podcast-list">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card">
            {podcast.image && <img src={podcast.image} alt={podcast.title} />}
            <h2>{podcast.title}</h2>
            <p>{podcast.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
