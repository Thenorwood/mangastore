import {useState, useEffect} from "react";
import type {Manga} from "../../types/Manga.tsx";
import {Link} from "react-router";
import ChatWidget from "../ChatWidget.tsx";

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



    return (
        <>
            <div className="hero-banner">
                <img
                    src="http://localhost:8080/images/classroomwallpaper.jpg"
                    alt="Banner"
                />
            </div>

            <div className="container py-4">
                <div className="mb-4">
                    <h1>Home</h1>
                    <p className="text-muted">Browse the manga collection.</p>
                </div>

                <div className="row g-4">
                    {manga.length > 0 &&
                        manga.map((manga) => (
                            <div key={manga.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                                <div className="card h-100 shadow-sm">
                                    <div style={{ height: "420px", overflow: "hidden" }}>
                                        <img
                                            src={`http://localhost:8080/images/${manga.imgFilename}`}
                                            alt={manga.title}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </div>

                                    <div className="card-body text-center">
                                        <h5 className="card-title">{manga.title}</h5>

                                        <Link
                                            to={`/details/${manga.id}`}
                                            className="btn btn-dark w-100"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <ChatWidget />
            </div>
        </>
    );
}