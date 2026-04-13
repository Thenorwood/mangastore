import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router";
import type { Manga } from "../../types/Manga.tsx";
import type { Cart, CartItem } from "../../types/Cart.tsx";

type CartDisplayItem = Manga & {
    selectedVolumes: number[];
};

export default function Cart() {
    const COOKIE_KEY = "shopping_cart";

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [displayItems, setDisplayItems] = useState<CartDisplayItem[]>([]);

    useEffect(() => {
        const loadCart = async () => {
            const raw = Cookies.get(COOKIE_KEY);
            const cart: Cart = raw ? JSON.parse(raw) : { items: [] };

            setCartItems(cart.items);

            if (cart.items.length === 0) {
                setDisplayItems([]);
                return;
            }

            const res = await fetch("http://localhost:8080/Manga/");
            const mangaList: Manga[] = await res.json();

            const mergedItems: CartDisplayItem[] = cart.items
                .map((cartItem) => {
                    const manga = mangaList.find((m) => m.id === cartItem.id);

                    if (!manga) {
                        return null;
                    }

                    return {
                        ...manga,
                        selectedVolumes: cartItem.selectedVolumes
                    };
                })
                .filter((item): item is CartDisplayItem => item !== null);

            setDisplayItems(mergedItems);
        };

        void loadCart();
    }, []);

    const handleRemoveFromCart = (id: number) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);

        const updatedCart: Cart = {
            items: updatedCartItems
        };

        Cookies.set(COOKIE_KEY, JSON.stringify(updatedCart), { expires: 1 });

        setCartItems(updatedCartItems);
        setDisplayItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="container py-4">
            <h1 className="mb-4">Your Cart</h1>

            {displayItems.length === 0 ? (
                <div className="alert alert-info">
                    Your cart is empty.{" "}
                    <Link to="/" className="alert-link">
                        Go back to the store
                    </Link>
                </div>
            ) : (
                <>
                    <div className="row g-4">
                        {displayItems.map((item) => (
                            <div key={item.id} className="col-12">
                                <div className="card shadow-sm">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-2">
                                            <img
                                                src={`http://localhost:8080/images/${item.imgFilename}`}
                                                alt={item.title}
                                                className="img-fluid rounded-start"
                                                style={{
                                                    width: "100%",
                                                    height: "220px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        </div>

                                        <div className="col-md-7">
                                            <div className="card-body">
                                                <h4 className="card-title mb-2">{item.title}</h4>

                                                <p className="card-text mb-2">
                                                    <strong>Volumes:</strong>{" "}
                                                    {item.selectedVolumes.map((v) => (
                                                        <span key={v} className="badge bg-dark me-1">
        {v}
    </span>
                                                    ))}
                                                </p>

                                                <p className="card-text text-muted mb-0">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="card-body text-md-end">
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() => handleRemoveFromCart(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 pt-4 border-top d-flex justify-content-between">

                        {/* back */}
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => window.history.back()}
                        >
                            Back
                        </button>

                        {/* checkout */}
                        <Link to="/checkout" className="btn btn-primary btn-lg">
                            Proceed to Checkout
                        </Link>

                    </div>
                </>
            )}
        </div>
    );
}