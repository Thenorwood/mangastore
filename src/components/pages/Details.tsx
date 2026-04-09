import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Manga } from "../../types/Manga.tsx";
import Cookies from "js-cookie";
import type { Cart, CartItem } from "../../types/Cart.tsx";

export default function Details() {
    const { id } = useParams();
    const [showMessage, setShowMessage] = useState(false);
    const [manga, setManga] = useState<Manga>();
    const COOKIE_KEY = "shopping_cart";

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:8080/Manga/" + id);
            const manga = await res.json();
            setManga(manga);
        };

        void fetchData();
    }, [id]);

    const handleAddToCart = () => {
        const raw = Cookies.get(COOKIE_KEY);

        const cart: Cart = raw ? JSON.parse(raw) : { items: [] };
        const quantity = 1;

        const existing = cart.items.find((item: CartItem) => item.id === manga?.id);

        const updatedItems = existing
            ? cart.items.map((item: CartItem) =>
                item.id === manga?.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            )
            : [...cart.items, { id: manga?.id, quantity }];

        Cookies.set(COOKIE_KEY, JSON.stringify({ items: updatedItems }), { expires: 1 });

        setShowMessage(true);
    };

    return (
        <div className="container py-5">

            {showMessage && (
                <div className="alert alert-success" role="alert">
                    Item added to cart
                </div>
            )}

            <h1 className="mb-4">Details</h1>

            {manga && (
                <div className="card shadow-sm">
                    <div className="row g-0">

                        {/* Image */}
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

                        {/* Text */}
                        <div className="col-md-8">
                            <div className="card-body">

                                <h2 className="card-title mb-3">
                                    {manga.title}
                                </h2>

                                <p className="card-text">
                                    {manga.description}
                                </p>

                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={handleAddToCart}
                                >
                                    Add to cart
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}