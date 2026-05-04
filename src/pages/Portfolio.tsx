import Navbar from "../components/Navbar"
import Footer from "../sections/Footer"
import styles from "./Portfolio.module.css"
import PortfolioCard from "../components/PortfolioCard"
import { PROJECTS } from "../constants"
import { useEffect } from "react"

interface PortfolioProps {
    anchors: {[key:string]: React.RefObject<HTMLElement | null>}
}

export default function Portfolio ({anchors}: PortfolioProps) {
useEffect(()=>{
    window.scrollTo(0,0);
},[])
    return (
        <>
            <Navbar anchors={anchors} />
            <section className={styles.portfolioContainer}>
                <h1 className="title">Portfoli<span>o</span></h1>
                {PROJECTS.map((project) => <PortfolioCard key={project.alt} project={project} />)}
            </section>
            <Footer anchors={anchors} />
        </>
    )
}