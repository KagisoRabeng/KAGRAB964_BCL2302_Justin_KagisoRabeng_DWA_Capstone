import React, { useState, useEffect } from "react";
import Podcasts from "./Podcasts";

export default function PodcastComponent ({ id })  {
  const [podcastData, setPodcastData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/10716`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setPodcastData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPodcastData(null);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {podcast? (
        <div>
          <h1>{podcast.title}</h1>
          {poImage}
          <p>{podcast.description}</p>
          {/* Add other elements to display relevant data */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};


