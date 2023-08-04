import React from "react";

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
  
  const getGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      genreIds = [genreIds];
    }
     return genreIds.map((id) => genres[id - 1]).join(", ");
  }


const handleSortAZ = () => {
    const sortedShows = [...shows].sort((a, b) => a.title.localeCompare(b.title));
    setShows(sortedShows);
  };

  const handleSortZA = () => {
    const sortedShows = [...shows].sort((a, b) => b.title.localeCompare(a.title));
    setShows(sortedShows);
  };

  const handleSortByDateAscending = () => {
    const sortedShows = [...shows].sort((a, b) => new Date(a.updated) - new Date(b.updated));
    setShows(sortedShows);
  };

  const handleSortByDateDescending = () => {
    const sortedShows = [...shows].sort((a, b) => new Date(b.updated) - new Date(a.updated));
    setShows(sortedShows);
  };

  // Filtering function
  const handleFilterByTitle = (searchQuery) => {
    const filteredShows = shows.filter((show) =>
      show.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setShows(filteredShows);
  };

  // Fuzzy search function
  const handleFuzzySearch = (searchQuery) => {

    setSearchQuery(searchQuery);
  if (!searchQuery) {
    setShows(prevShowsRef.current); // If the search query is empty, reset to the original list of shows
  } else {
    const fuse = new Fuse(shows, { keys: ['title'] });
    const fuzzyResults = fuse.search(searchQuery);
    const fuzzyMatches = fuzzyResults.map((result) => result.item);
    prevShowsRef.current = shows;
    setShows(fuzzyMatches);
  }
  };