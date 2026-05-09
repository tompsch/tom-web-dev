import { NavLink, useLocation, useNavigate } from "react-router"
import styles from "./Navbar.module.css"

interface NavbarProps {
    footer?: boolean,
}

export default function Navbar({footer}: NavbarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const handleHomeClick = () => {
        if(location.pathname === "/") {
            window.scrollTo({top: 0, behavior:"smooth"});
        } else {
            navigate("/"); 
            window.scrollTo({top: 0, behavior:"instant"});
        }
    }
    return (
        <nav className={!footer ? styles.navBar : styles.footerNavBar}>
            {!footer && <NavLink to="/">/HOME</NavLink>}
            <ul className={styles.fullScreenNav}>
                {footer && <li onClick={handleHomeClick}>/HOME</li>}
                <li><NavLink to="/portfolio">WORK</NavLink></li>
                <li><NavLink to="/about">ABOUT</NavLink></li>
                <li><NavLink to="/contact">CONTACT</NavLink></li>
            </ul>
        </nav>
    )
}