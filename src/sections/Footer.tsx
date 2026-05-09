import styles from "./Footer.module.css"
import Line from "../components/Line"
import Navbar from "../components/Navbar"
import { SOCIALS, PICTURES } from "../constants"

export default function Footer () {

    return (
        <footer>
            <Line />
            <h2>Tomás Puebla Schildknecht <span>.web developer</span></h2>
            <div className={styles.footerMain}>
                <Navbar footer={true}/>
                <img src={PICTURES.islander[0]} alt={PICTURES.islander[1]}className={styles.footerPic}></img>
                <ul className={styles.socialIcons}>
                    {SOCIALS.map((icon)=>
                    (<li key={icon.alt}>
                        <a href={icon.url} target="_blank" rel="noopener noreferrer">
                            <img className={styles.icon} src={icon.icon} alt={icon.alt}/>
                        </a>
                    </li>))}
                </ul>
            </div>
            <p>2026 © /tompsch.dev</p>
        </footer>
    )
}