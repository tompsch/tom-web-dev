import styles from "./Footer.module.css"
import Line from "../components/Line"
import Navbar from "../components/Navbar"
import footerPic from "../assets/footer_pic.jpeg"
import linkedin from "../assets/linkedin.svg"
import github from "../assets/github.svg"
import mail from "../assets/email.svg"

interface FooterProps {
    anchors: {[key:string]: React.RefObject<HTMLElement | null>}
}

export default function Footer ({anchors}: FooterProps) {
const socials = [
    {url: linkedin,
        alt: "Linkedin icon"
    },
    {url: github,
        alt: "GitHub icon"
    },
    {url: mail,
        alt: "E-mail icon"
    }
]
    return (
        <footer>
            <Line />
            <h2>Tomás Puebla Schildknecht <span>.web developer</span></h2>
            <div className={styles.footerMain}>
                <Navbar footer={true} anchors={anchors}/>
                <img src={footerPic} className={styles.footerPic}></img>
                <ul className={styles.socialIcons}>
                    {socials.map((icon)=> <li key={icon.alt}><img className={styles.icon} src={icon.url} alt={icon.alt}></img></li> )}
                </ul>
            </div>
            <p>2026 © tom-psch.dev</p>
        </footer>
    )
}