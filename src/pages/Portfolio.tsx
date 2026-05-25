import styles from "./Portfolio.module.css"
import PortfolioCard from "../components/PortfolioCard"
import { PROJECTS, TEXT } from "../constants"
import { useEffect } from "react"
import Button from "../components/Button"
import { useNavigate } from "react-router"
import { useLang } from "../context/LangContext"

export default function Portfolio () {
    const { lang } = useLang();
    const langIndex = lang === "en" ? 0 : 1;
    const navigate = useNavigate();
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    return (
        <>
            <section className={styles.portfolioContainer}>
                <h1 className="title">{lang === "en" ? TEXT.workPage.title[0] : TEXT.workPage.title[2]}<span>{lang === "en" ? TEXT.workPage.title[1] : TEXT.workPage.title[3]}</span></h1>
                {PROJECTS.map((project) => <PortfolioCard key={project.alt} project={project} />)}
                <Button withText={TEXT.workPage.cta[langIndex]} onClick={()=>navigate("/contact")}/>
            </section>
        </>
    )
}