import React, { useEffect, useState, Fragment } from "react";
import "../Components/Podcasts.css"
import "../Components/Carousel.css"
import { SlDetails, SlSpinner } from "@shoelace-style/shoelace/dist/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


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

const Podcast = ({ selectedGenre }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [lastUpdatedSortOrder, setLastUpdatedSortOrder] = useState("asc");
  const [sortedPodcasts, setSortedPodcasts] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [view, setView] = useState("showList");
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const BASE_URL = "https://podcast-api.netlify.app";
  const fetchShowDetails = async (showId) => {
    try {
      const response = await fetch(`${BASE_URL}/id/${showId}`);
      const data = await response.json();
      // Make sure seasons property exists and is an array
      data.seasons = data.seasons || [];
      return data;
    } catch (error) {
      throw new Error("Error fetching show details:", error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        setPodcasts(data);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    setIsSorting(true);
    const sorted = [...podcasts];
    sorted.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortOrder === "asc") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
    const filteredPodcasts = selectedGenre
      ? sorted.filter((podcast) =>
          podcast.genres.includes(parseInt(selectedGenre))
        )
      : sorted;
    setSortedPodcasts(filteredPodcasts);
    setIsSorting(false);
  }, [podcasts, sortOrder, selectedGenre]);
  useEffect(() => {
    setIsSorting(true);
    const sorted = [...podcasts];
    sorted.sort((a, b) => {
      const timeA = new Date(a.updated).getTime();
      const timeB = new Date(b.updated).getTime();
      if (lastUpdatedSortOrder === "asc") {
        return timeA - timeB;
      } else {
        return timeB - timeA;
      }
    });
    const filteredPodcasts = selectedGenre
      ? sorted.filter((podcast) =>
          podcast.genres.includes(parseInt(selectedGenre))
        )
      : sorted;
    setSortedPodcasts(filteredPodcasts);
    setIsSorting(false);
  }, [podcasts, lastUpdatedSortOrder, selectedGenre]);
  const getGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      genreIds = [genreIds];
    }
    return genreIds.map((id) => genres[id - 1]).join(",");
  };
  const handleShowClick = async (show) => {
    try {
      const showDetails = await fetchShowDetails(show.id);
      setSelectedShow(showDetails);
      setSelectedSeason(null); // Add this line to reset selectedSeason
      setView("showDetail");
    } catch (error) {
      console.error("Error loading show details:", error);
    }
  };
  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };
  return (
    <div className="Middle-con">
      {view === "showList" ? (
        <>
          <div className="carousel-container">
            
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className={`sort-button ${sortOrder === "asc" ? "active" : ""}`}
            onClick={() => setSortOrder("asc")}
            disabled={isLoading || isSorting}
          >
            Sort A-Z
          </button>
          <button
            className={`sort-button ${sortOrder === "desc" ? "active" : ""}`}
            onClick={() => setSortOrder("desc")}
            disabled={isLoading || isSorting}
          >
            Sort Z-A
          </button>
          <button
            className={`sort-button ${
              lastUpdatedSortOrder === "asc" ? "active" : ""
            }`}
            onClick={() => setLastUpdatedSortOrder("asc")}
            disabled={isLoading || isSorting}
          >
            Sort Oldest First
          </button>
          <button
            className={`sort-button ${
              lastUpdatedSortOrder === "desc" ? "active" : ""
            }`}
            onClick={() => setLastUpdatedSortOrder("desc")}
            disabled={isLoading || isSorting}
          >
            Sort Newest First
          </button>
          <div className="podcast-list">
            {isLoading ? (
              <p className="loading-message">Loading podcasts...</p>
            ) : (
              sortedPodcasts.map((podcast) => (
                <div key={podcast.id} className="podcast-card">
                  {podcast.image && (
                    <img src={podcast.image} alt={podcast.title} />
                  )}
                  <h2>{podcast.title}</h2>
                  <h4>{getGenres(podcast.genres)}</h4>
                  <h6>Seasons: {podcast.seasons}</h6>
                  <button onClick={() => handleShowClick(podcast)}>
                    View Seasons
                  </button>
                  <p>
                    Last Updated:{" "}
                    {new Date(podcast.updated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <SlDetails summary="Show Description">
                    {podcast.description}
                  </SlDetails>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="show-detail-container">
          <button onClick={() => setView("showList")}>Back to Show List</button>
          <div>
            <h2>{selectedShow.title}</h2>
            {selectedShow.seasons &&
              selectedShow.seasons.map((season) => (
                <div key={season.number}>
                  <h3>Season {season.number}</h3>
                  <div className="image--">
                    <img
                      className="showImg"
                      src={season.image}
                      alt={`Season ${season.number}`}
                    />
                    <div>{season.episodes.length} Episodes</div>
                    <button
                      onClick={() => handleSeasonClick(season.number)}
                    >
                      View Episodes
                    </button>
                  </div>
                  {selectedSeason === season.number && (
                    <ul>
                      {season.episodes.map((episode) => (
                        <Fragment key={episode.id}>
                          <h4>{episode.name}</h4>
                          <li>{episode.title}</li>
                          <p>{episode.description}</p>
                          <audio controls>
                            <source src={episode.file} />
                          </audio>
                        </Fragment>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Podcast;