import React from 'react';

function Logout() {
    const handleLogout = () => {

        sessionStorage.removeItem('');

        // Redirect the user to the login page after logout.
        window.location.href = '/login'; 
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
