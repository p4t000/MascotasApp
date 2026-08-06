import './Footer.css'

function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <p className="footer__copy">&copy; {year} MascotasApp - Todos los derechos reservados.</p>
            <ul className="footer__links">
                <li><a className="footer__link" href="#">Términos y condiciones</a></li>
                <li><a className="footer__link" href="#">Política de privacidad</a></li>
                <li><a className="footer__link" href="#">Contacto</a></li>
            </ul>
        </footer>
    )
}

export default Footer;
