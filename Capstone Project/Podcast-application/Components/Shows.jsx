import React, { useEffect, useState } from 'react';

const ShowList = () => {
  const [showsData, setShowsData] = useState([]);

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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShowsData();
  }, []);

  return (
    <div>
      {showsData.map((show) => (
        <div key={show.id}>
          <h2>{show.title}</h2>
          <p>Description: {show.description}</p>
          <p>Seasons:</p>
          {show.seasons.map((season) => (
            <div key={season.seasonNumber}>
              <p>{season.title}</p>
              {season.episodes.map((episode, index) => (
                <div key={index}>
                   <p>{episode.episode} {episode.title}</p> 
                  
                  <p>{episode.description}</p>
                </div>
              ))}
            </div>
          ))}
          <p>Genres: {show.genres.join(', ')}</p>
          <img src={show.image} alt={show.title} style={{ maxWidth: '200px' }} />
          <p>Last Updated: {new Date(show.updated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowList;
