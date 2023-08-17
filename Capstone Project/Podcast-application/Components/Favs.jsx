import { useEffect, useState } from "react"
import supabase from "../src/supabase"

export default function(){

    //State variables to hold favourite data and loading state
    const [ favsData, setFavsData] = useState([])
    const [ favsDataStore, setFavsDataStore] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

//Fetch favourite data from supabase API on component mount
    useEffect(() => {
    const getFavs = async ()=> {
        const { data, error } = await supabase
            .from('favourites')
            .select()

            if(error){
                console.error(error)
            }else{
                setFavsData(data)
                setIsLoading(false);
            }
    }
        getFavs();
        
    }, []);

    //Update data store whenever favsData changes
    useEffect(() => {
        favorites()
    },[favsData]);

//Render favourite items based on favsData
    function favorites(){
        if(favsData){
            const favs = favsData.map((item) => {

                return (
                    <div key={item.id}>
                        <h3>{item.title}</h3>
                        <img src={item.image} style={{ width:"20%"}}/>
                        <p>{item.show}</p>

                        <audio controls>
                              <source src={item.audio} />
                        </audio>
                    </div>
                )
            }) 
            setFavsDataStore(favs)
        }  
    }

    
    return(
        <>
            {isLoading ? ( // Display loading message or spinner while loading
                <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                favsDataStore
            )}
        </>
    )
}