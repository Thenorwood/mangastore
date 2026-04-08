import {useState, useEffect} from "react";
import type {Manga} from "../../types/Manga.tsx";
import {Link} from "react-router";

export default function Home(){
    const [manga, setManga] = useState<Manga[]>([])

    useEffect(() =>{
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/Manga/');
            const manga = await res.json();
            setManga(manga)
        }

        fetchData()
    }, [])



    return(
        <>
            <h1>Home</h1>

            {manga.length > 0 &&(
                manga.map (manga => (
                    <div key={manga.id} className="pb-4">
                        <Link to={`/details/${manga.id}`}>
                        {manga.title}
                    </Link>
                    </div>

                ))
            )}
        </>
    )
}