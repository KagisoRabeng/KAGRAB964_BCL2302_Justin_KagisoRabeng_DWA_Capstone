import React, { useEffect, useState } from 'react';
import { SlDetails,  } from '@shoelace-style/shoelace/dist/react';
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
  const [loading, setLoading] = useState(true);

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
        }); {/* Spread the properties of the 'show' object */}

        const completeData = await Promise.all(completeDataPromises); {/*After creating an array of promises, waits for all the promises to resolve  */}
        setShowsData(completeData);
        setLoading(false); {/*Update the state with the complete show data */}
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchShowsData(); {/* Call the fetchShowsData function when the component mounts */}
  }, []);

  const getGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      genreIds = [genreIds];
    }
     return genreIds.map((id) => genres[id - 1]).join(", ");
  }

  return (
    <div className='container'>
      {loading ? (
        <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>// Display a loading message or spinner while loading
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
                            src={season.image} 
                            alt={`Season ${season.season}`} 
                            style={{ maxWidth: '200px' }} />
                                <div className='season'>
                                    {season.episodes.map((episode, index) => (
                                        <div key={index}>
                                            <SlDetails summary={`${episode.episode}. ${episode.title}`}>
                                                {episode.description}
                                                <SlDetails summary="Play Episode">
                                                <audio controls>
                                                <source src={episode.file}/>
                                                </audio>
                                                </SlDetails>
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
