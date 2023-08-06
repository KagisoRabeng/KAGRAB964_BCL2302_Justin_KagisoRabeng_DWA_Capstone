import React, { useEffect, useState } from 'react';
import { SlDetails, SlRating  } from '@shoelace-style/shoelace/dist/react';
import './Shows.css'



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
    <div className='container'>
        <div className='list'>
                {showsData.map((show) => (
                <div 
                    key={show.id} 
                    className="card">
                    <h2>{show.title}</h2>

                    <SlDetails summary="Description">
                        {show.description}
                    </SlDetails>
                  
                    {show.seasons.map((season) => (
                        <div key={season.seasonNumber} className='seasons'>
                            <img 
                            src={season.image} 
                            alt={`Season ${season.season}`} 
                            style={{ maxWidth: '200px' }} />
                            <SlDetails summary={season.title}>
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
      
    
    </div>
  );
};

export default ShowList;
