import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Manga} from "../../types/Manga.tsx";
import Cookies from "js-cookie";
import type {Cart, CartItem} from "../../types/Cart.tsx";

export default function Details(){
    const {id} = useParams()
    const [showMessage, setShowMessage] = useState(false)
    const [manga, setManga] = useState<Manga>()
    const COOKIE_KEY = "shopping_cart";

    useEffect(() =>{
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/Manga/' + id);
            const manga = await res.json();
            setManga(manga)
        }

        fetchData()
    }, [])

    const handleAddToCart = () => {

        const raw = Cookies.get(COOKIE_KEY)

        const cart: Cart = raw ? JSON.parse(raw) : { items: [] }
        const quantity = 1

        const existing = cart.items.find((item: CartItem) => item.id === manga?.id)
        const updatedItems = existing
            ? cart.items.map((item: CartItem) =>
                item.id === manga?.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            )
            //: [...cart.items, { id: movie.id, price: movie.price, quantity }]
            : [...cart.items, { id: manga?.id, quantity }]

        Cookies.set(COOKIE_KEY, JSON.stringify({ items: updatedItems }), { expires: 1 })

        setShowMessage(true)
    }



    return(
        <>
            {
                showMessage &&(
                    <p>
                        Item added to cart
                    </p>
                )
            }
            <h1>Details</h1>

            {
                manga &&(
                    <div>
                        <p>{manga.title}</p>
                        <p>{manga.description}</p>
                        <p>
                            <button className="btn btn-primary" onClick={handleAddToCart}>
                                    Add to cart
                            </button>
                        </p>
                    </div>
                )
            }
        </>
    )
}