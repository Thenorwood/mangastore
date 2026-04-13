import { Link, Outlet } from "react-router";

export default function Layout() {
    return(
        <div className="d-flex flex-column min-vh-100 bg-light">

            {/* HEADER / NAVBAR */}
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
                    <div className="container-fluid">

                        <Link to="/" className="navbar-brand fw-bold fs-4">
                            <i className="bi bi-book-half me-2"></i>
                            Manga Repository
                        </Link>

                        <div className="d-flex align-items-center gap-3">

                            <Link to="/" className="nav-link text-light">
                                Home
                            </Link>

                            <Link to="/cart" className="btn btn-outline-light">
                                <i className="bi bi-cart4 me-1"></i>
                                Cart
                            </Link>

                        </div>

                    </div>
                </nav>

                {/* STORE BANNER */}
                <div className="bg-secondary text-white text-center py-4">
                    <h2 className="fw-bold mb-1">Your Online Manga Store</h2>
                    <p className="mb-0">Browse and collect your favourite series</p>
                </div>
            </header>


            {/* MAIN CONTENT */}
            <main className="flex-grow-1">
                <Outlet/>
            </main>


            {/* FOOTER */}
            <footer className="bg-dark text-light mt-5 pt-5 pb-3">
                <div className="container">

                    {/* Newsletter */}
                    <div className="row mb-5 align-items-center">

                        <div className="col-md-6">
                            <h4 className="fw-bold">Get manga updates & deals</h4>
                            <p className="text-muted mb-0">
                                Sign up for our newsletter and receive a 10% discount coupon.
                            </p>
                        </div>

                        <div className="col-md-6">
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                />
                                <button className="btn btn-primary">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                    </div>

                    <hr className="border-secondary" />

                    {/* Footer Links */}
                    <div className="row mt-4">

                        <div className="col-md-3 mb-3">
                            <h6 className="fw-bold">Shop</h6>
                            <ul className="list-unstyled">
                                <li><a className="text-secondary text-decoration-none" href="/">Browse Manga</a></li>
                                <li><a className="text-secondary text-decoration-none" href="/cart">View Cart</a></li>
                                <li><a className="text-secondary text-decoration-none" href="#">New Releases</a></li>
                                <li><a className="text-secondary text-decoration-none" href="#">Popular Series</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h6 className="fw-bold">Account</h6>
                            <ul className="list-unstyled">
                                <li><a className="text-secondary text-decoration-none" href="#">Profile</a></li>
                                <li><a className="text-secondary text-decoration-none" href="#">Orders</a></li>
                                <li><a className="text-secondary text-decoration-none" href="#">Wishlist</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h6 className="fw-bold">Help</h6>
                            <ul className="list-unstyled">
                                <li><a className="text-secondary text-decoration-none" href="#">Shipping</a></li>
                                <li><a className="text-secondary text-decoration-none" href="#">Returns</a></li>
                                <li><a className="text-secondary text-decoration-none" href="#">FAQ</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-3">
                            <h6 className="fw-bold">Follow Us</h6>

                            <div className="d-flex gap-3 mt-2">

                                <a href="https://facebook.com" target="_blank" className="text-light">
                                    <i className="bi bi-facebook"></i>
                                </a>

                                <a href="https://twitter.com" target="_blank" className="text-light">
                                    <i className="bi bi-twitter"></i>
                                </a>

                                <a href="https://instagram.com" target="_blank" className="text-light">
                                    <i className="bi bi-instagram"></i>
                                </a>

                                <a href="https://youtube.com" target="_blank" className="text-light">
                                    <i className="bi bi-youtube"></i>
                                </a>

                            </div>

                        </div>

                    </div>

                    <hr className="border-secondary" />

                    {/* Copyright */}
                    <div className="text-center text-muted small">
                        © {new Date().getFullYear()} Manga Store • Terms • Privacy Policy
                    </div>

                </div>
            </footer>

        </div>
    )
}