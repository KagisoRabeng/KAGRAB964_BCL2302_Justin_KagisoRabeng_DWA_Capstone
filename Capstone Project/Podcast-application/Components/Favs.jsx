/**
 * React component for rendering favorite items fetched from Supabase API.
 * Displays a loading spinner while data is being fetched.
 */
import { useEffect, useState } from "react";
import supabase from "../src/supabase";

export default function FavoriteItems() {

    // State variables to hold favorite data and loading state
    const [favsData, setFavsData] = useState([]);
    const [favsDataStore, setFavsDataStore] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch favorite data from Supabase API on component mount
    useEffect(() => {
        const getFavs = async () => {
            try {
                const { data, error } = await supabase
                    .from('favourites')
                    .select();

                if (error) {
                    console.error(error);
                } else {
                    setFavsData(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching favorite data:", error);
            }
        };

        getFavs();
    }, []);

    // Update data store whenever favsData changes
    useEffect(() => {
        favorites();
    }, [favsData]);

    // Render favorite items based on favsData
    function favorites() {
        if (favsData) {
            const favs = favsData.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <img src={item.image} style={{ width: "20%" }} alt={item.title} />
                    <p>{item.show}</p>
                    <audio controls>
                        <source src={item.audio} />
                    </audio>
                </div>
            ));
            setFavsDataStore(favs);
        }
    }

    return (
        <>
            {isLoading ? ( // Display loading message or spinner while loading
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                favsDataStore
            )}
        </>
    );
}
