import { useEffect, useState } from "react"
import supabase from "../src/supabase"

export default function(){

    const [ favsData, setFavsData] = useState([])
    const [ favsDataStore, setFavsDataStore] = useState(null)
useEffect(() => {
    const getFavs = async ()=> {
        const { data, error } = await supabase
            .from('favourites')
            .select()

            if(error){
                console.error(error)
            }else{
                setFavsData(data)
            }
    }
        getFavs()
        
    })

    useEffect(() => {
        favorites()
    },[favsData])


    function favorites(){
        if(favsData){
            const favs = favsData.map((item) => {

                return (
                    <>
                    
                        <h3>{item.title}</h3>
                        <img src={item.image} style={{ width:"20%"}}/>
                        <p>{item.show}</p>

                        <audio controls>
                              <source src={item.audio} />
                        </audio>
                    
                    </>
                )
            }) 
            setFavsDataStore(favs)
        }  
    }

    
    return(
        <>
            { favsDataStore }
        </>
    )
}