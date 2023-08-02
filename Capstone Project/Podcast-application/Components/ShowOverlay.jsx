import React, { useState } from 'react';

const ShowOverlay = ({ imageUrl, showTitle }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div>
      <img src={imageUrl} alt={showTitle} onClick={toggleOverlay} />

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>{}</h2>
            {/* Add more information about the show here */}
            <button onClick={toggleOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowOverlay;
