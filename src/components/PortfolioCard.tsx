import styles from "./PortfolioCard.module.css"
import { useState, useRef } from "react"
import { ICONS } from "../constants"

interface PortFolioCardProps {
    project: {title: string, pic: string, fullTitle: string, description: string, widePic: string, alt: string, web: string, repository: string}
}

export default function PortfolioCard ({project}:PortFolioCardProps) {
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
                <h2>{project.title}</h2>
                <div className={styles.imgContainer}>
                    <img src={project.widePic} alt={project.alt}></img>
                </div>
                <div className={styles.links + " " + (noPointerEvents && styles.noPointerEvents)}>
                    <a href={project.web} target="_blank" rel="noopener noreferrer" >
                        <img src={ICONS.externalLink[0]} alt={ICONS.externalLink[1]} />
                    </a>
                    <a href={project.repository} target="_blank" rel="noopener noreferrer" >
                        <img src={ICONS.github[0]} alt={ICONS.github[1]} />
                    </a>
                </div>

            </div>
            <div className={styles.cardInformation}>
                <span>{project.fullTitle}</span>
                {project.description}
            </div>
        </article>
    )
}