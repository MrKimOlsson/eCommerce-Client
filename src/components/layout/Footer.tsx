import { NavLink } from 'react-router';
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
                <h4>Important links</h4>
                <ul>
                    <li>
                        <a href="#">GDPR</a>
                    </li>
                    <li>
                        <a href="#">FAQ</a>
                    </li>
                    <li>
                        <a href="#">Terms & conditions</a>
                    </li>
                    <li>
                        <a href="#">Guarantee</a>
                    </li>
                </ul>
            </div>

            <div className="column">
                <h4>From us to you</h4>
                <ul>
                    <li>
                        <NavLink to="#">Shipping</NavLink>
                    </li>
                    <li>
                        <a href="#">Delivery</a>
                    </li>
                    <li>
                        <a href="#">Returns</a>
                    </li>
                    <li>
                        <a href="#">Support</a>
                    </li>
                </ul>
            </div>


            <div className="column">
                <h4>Visit us</h4>
                <ul>
                    <li>
                        Perfect street 12
                    </li>
                    <li>
                        123 45
                    </li>
                    <li>
                        Some City
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
