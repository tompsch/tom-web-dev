import styles from "./Portfolio.module.css"
import PortfolioCard from "../components/PortfolioCard"
import { PROJECTS } from "../constants"
import { useEffect } from "react"

export default function Portfolio () {
useEffect(()=>{
    window.scrollTo(0,0);
},[])
    return (
        <>
            <section className={styles.portfolioContainer}>
                <h1 className="title">Portfoli<span>o</span></h1>
                {PROJECTS.map((project) => <PortfolioCard key={project.alt} project={project} />)}
            </section>
        </>
    )
}