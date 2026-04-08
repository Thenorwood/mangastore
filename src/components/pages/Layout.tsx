import {Link, Outlet} from "react-router";

export default function Layout() {
    return(
        <div className="container-fluid">
            <header>
                <nav className="navbar mb-4">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">
                            <i className="bi bi-book"></i> Manga Repository
                        </Link>

                        <div className="d-flex">
                            <Link to="/cart" className="text-reset fs-4">
                                <i className="bi bi-cart4"></i>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container-fluid">
                <Outlet/>
            </main>

            <footer className="container-fluid mt-5">
                Manga Repository, &copy; 2026
            </footer>
        </div>
    )
}