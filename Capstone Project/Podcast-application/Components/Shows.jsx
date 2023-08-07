import React, { useEffect, useState } from 'react';
import { SlDetails, SlRating  } from '@shoelace-style/shoelace/dist/react';
import './Shows.css'

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

  const getGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      genreIds = [genreIds];
    }
     return genreIds.map((id) => genres[id - 1]).join(", ");
  }

  return (
    <div className='container'>
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
                  
                    {show.seasons.map((season) => (
                        <div key={season.seasonNumber} className='seasons'>
                           
                            <SlDetails summary={season.title}>
                            <img 
                            src={season.image} 
                            alt={`Season ${season.season}`} 
                            style={{ maxWidth: '200px' }} />
                                <div className='season'>
                                    {season.episodes.map((episode, index) => (
                                        <div key={index}>
                                            <SlDetails summary={`${episode.episode}. ${episode.title}`}>
                                                
                                                {episode.description}
                                            </SlDetails>
                                        </div>
                                    ))} 
                                </div>
                           </SlDetails>
                            
                        </div>
                    ))}
                   
                </div>
            ))}
        </div>
      
    
    </div>
  );
};

export default ShowList;
