import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar__brand">MascotasApp</NavLink>
            <ul className="navbar__links">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "navbar__link navbar__link--active" : "navbar__link"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/Mascotas"
                        className={({ isActive }) =>
                            isActive ? "navbar__link navbar__link--active" : "navbar__link"
                        }
                    >
                        Mascotas
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;
