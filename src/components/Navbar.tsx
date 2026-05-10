import { NavLink, useLocation, useNavigate } from "react-router"
import styles from "./Navbar.module.css"
import { ICONS } from "../constants"
import { useTheme } from "../context/ThemeContext"

interface NavbarProps {
    footer?: boolean,
}

export default function Navbar({footer}: NavbarProps) {
    const {theme, setTheme} = useTheme();

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
    const toggleTheme = () => {
        theme==="dark" ? setTheme("light") : setTheme("dark")
    }
    return (
        <nav className={!footer ? styles.navBar : styles.footerNavBar}>
            {!footer &&
            <div className={styles.noFooter}>
                <NavLink to="/">/HOME</NavLink>
                <img
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => e.key === "Enter" && toggleTheme()}
                    src={ICONS.theme[0]}
                    alt={ICONS.theme[1]} className="monoIcons" onClick={toggleTheme}></img>
            </div>}
            <ul className={styles.fullScreenNav}>
                {footer && <li
                    onClick={handleHomeClick}
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => e.key === "Enter" && handleHomeClick()}
                    >/HOME</li>}
                <li><NavLink to="/portfolio">WORK</NavLink></li>
                <li><NavLink to="/about">ABOUT</NavLink></li>
                <li><NavLink to="/contact">CONTACT</NavLink></li>
            </ul>
        </nav>
    )
}