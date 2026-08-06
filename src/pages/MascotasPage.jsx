import { Link, Outlet } from "react-router-dom";
import './MascotasPage.css'

function MascotasPage() {
    return (
        <section className="mascotas">
            <h2 className="mascotas__title">Página mascotas</h2>

            <nav className="mascotas__nav">
                <Link className="mascotas__link" to="formulario">Formulario</Link>
                <Link className="mascotas__link" to="listado">Listado</Link>
            </nav>

            <Outlet />
        </section>
    );
}

export default MascotasPage;
