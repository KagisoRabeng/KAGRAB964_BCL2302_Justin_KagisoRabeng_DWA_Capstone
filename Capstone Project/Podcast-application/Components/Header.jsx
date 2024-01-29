/**
 * React component for displaying a header with search, sorting, and genre filtering options.
 * Fetches podcast data from an external API and renders the list of podcasts.
 * Allows users to search, sort, and filter podcasts based on title, genre, and update date.
 *
 * @param {function} onPodcastClick - Callback function triggered when a podcast is clicked.
 * @param {object} selectedPodcast - Currently selected podcast object.
 */

import React, { useState } from "react";
import axios from 'axios';
import "./Header.css";

/**
 * Component for rendering the header with search, sorting, and filtering options for podcasts.
 */
const Header = ({ onPodcastClick, selectedPodcast }) => {
// State variables
const [showPodcast, setPodcast] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
const [sortOption, setSortOption] = useState('az');
const [selectedGenre, setSelectedGenre] = useState('');

useEffect(() => {
  // Fetch podcast data on component mount
 axios
   .get('https://podcast-api.netlify.app/shows')
   .then((response) => {
     setPodcast(response.data);
     setLoading(false);
   })
   .catch((error) => {
     console.error('Error fetching show data:', error);
     setLoading(false);
   });
}, []);

  // Handle podcast click
  const handlePodcastClick = (podcast) => {
    onPodcastClick(podcast);
  };

   // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

   // Handle genre selection change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

   // Handle genre selection change
  const handleGenreChange = (event) => {
    const selectedGenreValue = event.target.value;
    setSelectedGenre(selectedGenreValue);
  };

  // Filter podcasts based on search term
  const filteredPodcasts = showPodcast.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  // Filter podcasts based on selected genre
  const genreFilteredPodcasts = selectedGenre
    ? filteredPodcasts.filter((show) =>
        show.genres.some((genre) =>
          genre.toLowerCase().includes(selectedGenre.toLowerCase())
        )
      )
    : filteredPodcasts;

    // Sort podcasts based on selected sort option
  const sortedPodcasts = [...genreFilteredPodcasts].sort((a, b) => {
    if (sortOption === 'az') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'za') {
      return b.title.localeCompare(a.title);
    } else if (sortOption === 'ascDate') {
      return new Date(a.updated) - new Date(b.updated);
    } else if (sortOption === 'descDate') {
      return new Date(b.updated) - new Date(a.updated);
    }
  });

  const genreMapping = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  

  return (
    <header className="app-header">
      <div>
      <h4 className="PodcastName">El Podcasto</h4>
      </div>
      {/* Search input */}
      <div className="search-box">
        <input
          id="input"
          type="text"
          placeholder="Search podcasts by title..."
          value={searchTerm}
          onChange={handleSearchChange} // Handle search input change
        />
      </div>

      {/* Sorting dropdown */}
      <div className="sort-dropdown">
      <select value={sortOption} onChange={handleSortChange}>
          <option value="az">Sort A-Z</option>
          <option value="za">Sort Z-A</option>
          <option value="ascDate">Sort Ascending by Date</option>
          <option value="descDate">Sort Descending by Date</option>
        </select>
      </div>

      {/* Genre selection dropdown */}
      <div className="genre-dropdown">
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select a Genre</option>
          {genreData.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
        {loading ? (
          <p>Loading podcast list...</p>
        ) : (
          <ul className="show-list">
            {sortedPodcasts.map((show) => (
              <li key={show.id} onClick={() => handlePodcastClick(show)}>
                <div className={`show-info ${show.id === selectedPodcast?.id ? 'selected' : ''}`}>
                  <img src={show.image} className="show-image" alt={show.title} />
                  <div className="show-details">
                    <h3 className="show-title">{show.title}</h3>
                    <p className="show-description">{show.description}</p>
                    <p className="show-seasons">Numbers of seasons: {show.seasons}</p>
                    <p className="show-updated">Updated: {formatDate(show.updated)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
    </header>
  );
};
export default Header;