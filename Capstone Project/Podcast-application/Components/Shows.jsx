import React, { useEffect, useState } from 'react';
import './Podcasts.css'
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';
import { SlDetails } from '@shoelace-style/shoelace';


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
        <div className='card'></div>
      {showsData.map((show) => (
        <div key={show.id} >
          <h2>{show.title}</h2>
          <p>Description: {show.description}</p>
          
          {show.seasons.map((season) => (
            <div key={season.seasonNumber}>
              
              <p>{season.title}</p>
              <img src={season.image} alt={`Season ${season.season}`} style={{ maxWidth: '200px' }} />
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



/*
 

    

    return (
        <div className="Middle-con">
          <div className="podcast-list">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="podcast-card">
                {podcast.image && <img src={podcast.image} alt={podcast.title} />}
                <h2>{podcast.title}</h2>
                <h5>Seasons: {podcast.seasons}</h5>
                <h6> {getGenres(podcast.genres)} </h6>
                <p>Last Updated: {podcast.updated}</p>
                <SlTree>
                <SlTreeItem>
                {season.title}
                <SlTreeItem>
                    Episodes
                    <SlTreeItem>{episode.episode} {episode.title}</SlTreeItem>
                    <SlDetails >
                    {podcast.description}
                    </SlDetails>
                </SlTreeItem>
    
              </div>
            ))}
          </div>
        </div>
      );
      */