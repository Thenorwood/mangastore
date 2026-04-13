import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Manga } from "../../types/Manga.tsx";
import Cookies from "js-cookie";
import type { Cart, CartItem } from "../../types/Cart.tsx";
import { Link } from "react-router";

export default function Details() {
    const { id } = useParams();
    const [showMessage, setShowMessage] = useState(false);
    const [manga, setManga] = useState<Manga>();
    const [selectedVolumes, setSelectedVolumes] = useState<number[]>([]);

    const COOKIE_KEY = "shopping_cart";

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:8080/Manga/" + id);
            const manga = await res.json();
            setManga(manga);
        };

        void fetchData();



    }, [id]);

    const handleVolumeToggle = (volume: number) => {
        setSelectedVolumes((prev) =>
            prev.includes(volume)
                ? prev.filter((v) => v !== volume)
                : [...prev, volume].sort((a, b) => a - b)
        );
    };

    const handleAddToCart = () => {
        if (!manga || selectedVolumes.length === 0) {
            return;
        }

        const raw = Cookies.get(COOKIE_KEY);
        const cart: Cart = raw ? JSON.parse(raw) : { items: [] };

        const existing = cart.items.find((item: CartItem) => item.id === manga.id);

        let updatedItems: CartItem[];

        if (existing) {
            const mergedVolumes = [...new Set([...existing.selectedVolumes, ...selectedVolumes])]
                .sort((a, b) => a - b);

            updatedItems = cart.items.map((item: CartItem) =>
                item.id === manga.id
                    ? { ...item, selectedVolumes: mergedVolumes }
                    : item
            );
        } else {
            updatedItems = [
                ...cart.items,
                {
                    id: manga.id,
                    selectedVolumes: selectedVolumes
                }
            ];
        }

        Cookies.set(COOKIE_KEY, JSON.stringify({ items: updatedItems }), { expires: 1 });

        setShowMessage(true);
        setSelectedVolumes([]);
    };

    return (
        <div className="container py-5">
            {showMessage && (
                <div
                    className="alert alert-success d-flex justify-content-between align-items-center"
                    role="alert"
                >
                    <span>Selected volumes added to cart</span>

                    {/* cart */}
                    <Link to="/cart" className="btn btn-sm btn-success">
                        View Cart
                    </Link>
                </div>
            )}

            {manga && (
                <>
                    <div className="card shadow-sm mb-4">
                        <div className="row g-0">
                            <div className="col-md-4 d-flex align-items-center justify-content-center p-4">
                                <img
                                    src={`http://localhost:8080/images/${manga.imgFilename}`}
                                    alt={manga.title}
                                    className="img-fluid rounded"
                                    style={{
                                        maxHeight: "420px",
                                        width: "auto"
                                    }}
                                />
                            </div>

                            <div className="col-md-8">
                                <div className="card-body mb-4 text">
                                    <h2 className="card-title fw-bold mb-1">{manga.title}</h2>
                                    <p className="card-text">{manga.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="mb-4 text text-center">
                                <h1 className="fw-bold mb-1">Manga Details</h1>
                                <p className="text-muted mb-0">Choose the volumes you want to add to your cart.</p>
                            </div>

                            <div className="row g-2">
                                {Array.from({ length: manga.volumes }, (_, i) => i + 1).map((volume) => (
                                    <div key={volume} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                        <button
                                            type="button"
                                            className={`btn w-100 ${
                                                selectedVolumes.includes(volume)
                                                    ? "btn-dark"
                                                    : "btn-outline-secondary"
                                            }`}
                                            onClick={() => handleVolumeToggle(volume)}
                                        >
                                            Volume {volume}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 d-flex gap-2 flex-wrap">
                                {/* add */}
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </button>

                                {/* clear */}
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setSelectedVolumes([])}
                                >
                                    Clear Selection
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 d-flex justify-content-between">

                        {/* back */}
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            onClick={() => window.history.back()}
                        >
                            Back
                        </button>

                        {/* cart */}
                        <Link to="/cart"
                              className="btn btn-success">
                            View Cart
                        </Link>

                    </div>
                </>
            )}
        </div>
    );
}