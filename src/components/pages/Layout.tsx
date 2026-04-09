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
            <footer className="bg-dark text-light text-center py-3 mt-auto">
                <div className="container">
                    Manga Repository &copy; 2026
                </div>
            </footer>

        </div>
    )
}