import { NavLink, useLocation, useNavigate } from "react-router"
import styles from "./Navbar.module.css"
import { ICONS, TEXT } from "../constants"
import { useTheme } from "../context/ThemeContext"
import { useLang } from "../context/LangContext"

interface NavbarProps {
    footer?: boolean,
}

export default function Navbar({footer}: NavbarProps) {
    const { lang } = useLang();
    const langIndex = lang === "en" ? 0 : 1;
    const prefix = lang === "es" ? "/es" : "";
    const {theme, setTheme} = useTheme();

    const location = useLocation();
    const navigate = useNavigate();
    const homePath = lang === "es" ? "/es" : "/";
    const handleHomeClick = () => {
        if(location.pathname === homePath) {
            window.scrollTo({top: 0, behavior:"smooth"});
        } else {
            navigate(homePath);
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
                <NavLink to={homePath}>{TEXT.nav.home[langIndex]}</NavLink>
                <img
                    height={36}
                    width={36}
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => e.key === "Enter" && toggleTheme()}
                    src={theme === "light" ? ICONS.themeSun[0] : ICONS.themeMoon[0]}
                    alt={theme === "light" ? ICONS.themeSun[1] : ICONS.themeMoon[1]}
                    className="monoIcons"
                    onClick={toggleTheme}></img>
            </div>}
            <ul className={styles.fullScreenNav}>
                {footer && <li
                    onClick={handleHomeClick}
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => e.key === "Enter" && handleHomeClick()}
                    >{TEXT.nav.home[langIndex]}</li>}
                <li><NavLink to={`${prefix}/portfolio`}>{TEXT.nav.work[langIndex]}</NavLink></li>
                <li><NavLink to={`${prefix}/about`}>{TEXT.nav.about[langIndex]}</NavLink></li>
                <li><NavLink to={`${prefix}/contact`}>{TEXT.nav.contact[langIndex]}</NavLink></li>
            </ul>
        </nav>
    )
}