import styles from "./PortfolioCard.module.css"
import { useState, useRef } from "react"
import { ICONS } from "../constants"
import { useLang } from "../context/LangContext"

interface PortFolioCardProps {
    project: {title: string, titleEs: string, pic: string, fullTitle: string, fullTitleEs: string, description: string, descriptionEs: string, widePic: string, alt: string, altEs: string, web: string, repository: string}
}

export default function PortfolioCard ({project}:PortFolioCardProps) {
    const { lang } = useLang();
    const [noPointerEvents, setNoPointerEvents] = useState(true);
    const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleClick = () => {
        if (delayRef.current) {
            clearTimeout(delayRef.current);
        }
        setNoPointerEvents(true);
        delayRef.current = setTimeout(() => setNoPointerEvents(false), 500);
    }
    return (
        <article className={styles.portfolioCard} onClick={handleClick} onMouseLeave={()=>setNoPointerEvents(true)} >
            <div className={styles.cardContainer}>
                <h2>{lang === "en" ? project.title : project.titleEs}</h2>
                <div className={styles.imgContainer}>
                    <img width={1560} height={79} src={project.widePic} alt={lang === "en" ? project.alt : project.altEs}></img>
                </div>
                <div className={styles.links + " " + (noPointerEvents && styles.noPointerEvents)}>
                    <a href={project.web} target="_blank" rel="noopener noreferrer" >
                        <img width={36} height={36} src={ICONS.externalLink[0]} alt={ICONS.externalLink[1]} />
                    </a>
                    <a href={project.repository} target="_blank" rel="noopener noreferrer" >
                        <img width={36} height={36} src={ICONS.github[0]} alt={ICONS.github[1]} />
                    </a>
                </div>

            </div>
            <div className={styles.cardInformation}>
                <span>{lang === "en" ? project.fullTitle : project.fullTitleEs}</span>
                {lang === "en" ? project.description : project.descriptionEs}
            </div>
        </article>
    )
}