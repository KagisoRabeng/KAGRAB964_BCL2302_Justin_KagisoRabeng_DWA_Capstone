import React, { useState, useEffect } from "react";
import { SlDetails, SlRating  } from '@shoelace-style/shoelace/dist/react';
import "./Podcasts.css"
import ShowList from "./Shows";

const genres = [
  "Personal Growth",
  "True Crime and Investigative Journalism",
  "History",
  "Comedy",
  "Entertainment",
  "Business",
  "Fiction",
  "News",
  "Kids and Family",
];

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState();


  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setPodcasts(data));
  }, []);


  const getGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      genreIds = [genreIds];
    }
     return genreIds.map((id) => genres[id - 1]).join(", ");
  }

  const handlePodcastClick = (podcast) => {
    setSelectedPodcast(podcast);
  };

  return (
    <>
      

      <div className="Middle-con">
        <div className="podcast-list">
          {podcasts.map((podcast) => (
            <div 
              key={podcast.id} 
              className="podcast-card"
              onClick={() => handlePodcastClick(podcast)}
              >
              {podcast.image && <img src={podcast.image} alt={podcast.title} />}
              <h2>{podcast.title}</h2>
              <h5>Seasons: {podcast.seasons}</h5>
              <h6> {getGenres(podcast.genres)} </h6>
              <p>Last Updated:{' '}
              {new Date(podcast.updated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              })}</p>
              <SlDetails summary="Description">
                {podcast.description}
              </SlDetails>

            </div>
          ))}
        </div>
      </div>

      <ShowList selectedPodcast={selectedPodcast} />
    </>
  );
}
