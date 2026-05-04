import { NavLink } from "react-router"
import styles from "./Navbar.module.css"

interface NavbarProps {
    footer?: boolean,
    anchors: {[key:string]: React.RefObject<HTMLElement | null>}

}

export default function Navbar({footer, anchors}: NavbarProps) {
    const handleScroll = (linkName: string) => {
        if(anchors[linkName].current) {
            anchors[linkName].current.scrollIntoView({behavior:"smooth"});
        }
    }
    return (
        <nav className={!footer ? styles.navBar : styles.footerNavBar}>
            {!footer && <NavLink to="/">/HOME</NavLink>}
            <ul className={styles.fullScreenNav}>
                {footer && <li onClick={() => window.scrollTo({top: 0, behavior:"smooth"})}>/HOME</li>}
                <li><NavLink to="/portfolio">WORK</NavLink></li>
                {/* <li onClick={() => handleScroll("work")}>WORK</li> */}
                {/* <li><NavLink to="/">ABOUT</NavLink></li> */}
                <li onClick={() => handleScroll("about")}>ABOUT</li>
                <li><NavLink to="/">CONTACT</NavLink></li>
            </ul>
        </nav>
    )
}