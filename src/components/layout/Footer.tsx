import '../../styles/layout/footer.scss';

export const Footer = () => {
  return (
    <footer>

        <div className='logo'>
            <a href="/"><h1>Quirk</h1></a>
        </div>
        <section className='column-wrapper'>

            <div className="column">
                <h4>Social media</h4>
                <ul>
                    <li>
                        <a href="https://sv-se.facebook.com/">Facebook</a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/">Instagram</a>
                    </li>
                    <li>
                        <a href="https://x.com/?lang=sv">Twitter</a>
                    </li>
                    <li>
                        <a href="https://se.linkedin.com/">LinkedIn</a>
                    </li>
                </ul>
            </div>

            <div className="column">
                <h4>Länkar</h4>
                <ul>
                    <li>
                        <a href="#">GDPR</a>
                    </li>
                    <li>
                        <a href="#">Frakt & Retur</a>
                    </li>
                    <li>
                        <a href="#">Leverans</a>
                    </li>
                    <li>
                        <a href="#">Kundtjänst</a>
                    </li>
                </ul>
            </div>

            <div className="column">
                <h4>Produkter</h4>
                <ul>
                    <li>
                        <a href="#">Män</a>
                    </li>
                    <li>
                        <a href="#">Kvinnor</a>
                    </li>
                    <li>
                        <a href="#">Barn</a>
                    </li>
                    <li>
                        <a href="#">Accesoarer</a>
                    </li>
                </ul>
            </div>


            <div className="column">
                <h4>Butik</h4>
                <ul>
                    <li>
                        Hittepågatan 12
                    </li>
                    <li>
                        123 45
                    </li>
                    <li>
                        Stockholm
                    </li>
                    <li>
                        <a href="#">Tel: 020-123 456</a>
                    </li>
                </ul>
            </div>
        </section>
    </footer>
  )
}
