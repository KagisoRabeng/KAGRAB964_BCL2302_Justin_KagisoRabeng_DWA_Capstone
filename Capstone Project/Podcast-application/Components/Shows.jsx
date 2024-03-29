/**
 * React component for displaying a list of shows with their details fetched from an external API.
 * Shows loading spinner while fetching data.
 */
import React, { useEffect, useState } from 'react';
import { SlDetails } from '@shoelace-style/shoelace/dist/react';
import './Shows.css';

// Array of genres for the shows
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

/**
 * Component for rendering a list of shows.
 */
const ShowList = () => {
  // State variables to hold show data and loading state
  const [showsData, setShowsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch show data from the external API on component mount
  useEffect(() => {
    const fetchShowsData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        const data = await response.json();

        // Fetch episodes for each show and update the state with complete data
        const completeDataPromises = data.map(async (show) => {
          const episodesResponse = await fetch(`https://podcast-api.netlify.app/id/${show.id}`);
          const episodesData = await episodesResponse.json();

          return {
            ...show,
            seasons: episodesData.seasons,
          };
        });

        const completeData = await Promise.all(completeDataPromises);
        setShowsData(completeData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchShowsData();
  }, []);

  // Function to get genre names based on genre IDs
  const getGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      genreIds = [genreIds];
    }
    return genreIds.map((id) => genres[id - 1]).join(", ");
  }

  return (
    <div className='container'>
      {loading ? (
        // Display a loading message or spinner while loading
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='list'>
          {showsData.map((show) => (
            <div 
              key={show.id} 
              className="card">
              <h2>{show.title}</h2>
              <img 
                className='image'
                src={show.image} 
                alt={show.title} 
              />
              <p>Genres: {getGenres(show.genres)}</p>
              <p>Last Updated: {new Date(show.updated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
              })}</p>

              <SlDetails summary="Description">
                {show.description}
              </SlDetails>
              
              <SlDetails summary="Seasons">
                {show.seasons.map((season) => (
                  <div key={season.seasonNumber} className='seasons'>
                    <SlDetails summary={season.title}>
                      <img 
                        className='season-img'
                        src={season.image} 
                        alt={`Season ${season.season}`} 
                        style={{ maxWidth: '200px' }} 
                      />
                      <div className='season'>
                        {season.episodes.map((episode, index) => (
                          <div key={index}>
                            <SlDetails summary={`${episode.episode}. ${episode.title}`}>
                              <SlDetails summary="Episode Description">
                                {episode.description}
                              </SlDetails>
                              <audio controls>
                                <source src={episode.file}/>
                              </audio>
                            </SlDetails>
                          </div>
                        ))} 
                      </div>
                    </SlDetails>
                  </div>
                ))}
              </SlDetails>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowList;

