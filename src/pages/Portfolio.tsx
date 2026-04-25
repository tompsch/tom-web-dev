import Navbar from "../components/Navbar"
import Footer from "../sections/Footer"
import styles from "./Portfolio.module.css"

interface PortfolioProps {
    anchors: {[key:string]: React.RefObject<HTMLElement | null>}
}

export default function Portfolio ({anchors}: PortfolioProps) {
    return (
        <>
            <Navbar anchors={anchors} />
            <section className={styles.portfolioContainer}>
                <h1 className="title">Portfoli<span>o</span></h1>
            </section>
            <Footer anchors={anchors} />
        </>
    )
}