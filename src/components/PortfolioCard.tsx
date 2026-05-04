import styles from "./PortfolioCard.module.css"
import gitIcon from "../assets/github3.svg"
import extLink from "../assets/externalLink4.svg"
import { useState, useRef } from "react"

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
                    <img src={project.widePic}></img>
                </div>
                <div className={styles.links + " " + (noPointerEvents && styles.noPointerEvents)}>
                    <a href={project.web} target="_blank" rel="noopener noreferrer" >
                        <img src={extLink} alt="External link icon" />
                    </a>
                    <a href={project.repository} target="_blank" rel="noopener noreferrer" >
                        <img src={gitIcon} alt="GitHub icon" />
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