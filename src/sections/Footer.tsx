import styles from "./Footer.module.css"
import Line from "../components/Line"
import Navbar from "../components/Navbar"
import { SOCIALS, PICTURES, TEXT } from "../constants"
import { useLang } from "../context/LangContext"
import type React from "react"

export default function Footer () {
    const { lang, setLang } = useLang();
    // const prefix = lang === "es" ? "/es" : "";
    const handleLangClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const selection = e.currentTarget.innerText.toLowerCase();
        if((selection !==  "es" && selection !== "en") || selection === lang) return;
        setLang(selection);
    }
    return (
        <footer>
            <Line />
            <h2>Tomás Puebla Schildknecht <span>{TEXT.footer.role[lang === "en" ? 0 : 1]}</span></h2>
            <div className={styles.footerMain}>
                <Navbar footer={true}/>
                <img
                    loading="lazy"
                    width={1420}
                    height={144}
                    src={PICTURES.islander[0]}
                    alt={PICTURES.islander[1]}
                    className={styles.footerPic}>
                </img>
                <ul className={styles.socialIcons}>
                    {SOCIALS.map((icon)=>
                    (<li key={icon.alt}>
                        <a href={icon.url} target="_blank" rel="noopener noreferrer">
                            <img width={36} height={36} className={styles.icon + " " + "monoIcons"} src={icon.icon} alt={icon.alt}/>
                        </a>
                    </li>))}
                </ul>
            </div>
            <div className={styles.subFooter}>
                <p>2026 © / tompsch.dev / </p>
                <p
                className={lang === "en" ? styles.activeLang : ""}
                onClick={handleLangClick}
                tabIndex={0}
                role="button"
                // onKeyDown={e => e.key === "Enter" && (e)=>handleLangClick(e.)}
                >
                    EN
                </p>
                <span> · </span>
                <p
                className={lang === "es" ? styles.activeLang : ""}
                onClick={handleLangClick}>
                    ES
                </p>
            </div>
        </footer>
    )
}