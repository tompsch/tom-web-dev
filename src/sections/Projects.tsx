import styles from "./Projects.module.css"
import Card from "../components/Card"
import Button from "../components/Button"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import Line from "../components/Line"
import { PROJECTS, ICONS, TEXT } from "../constants";
import { useLang } from "../context/LangContext"

export default function Projects () {
    const { lang } = useLang();
    const langIndex = lang === "en" ? 0 : 1;
    const navigate = useNavigate();
    const scrollerRef = useRef<HTMLElement>(null);
    const [size, setSize] = useState(window.innerWidth);
    const handleResize = () => {
        const clientWidth = window.innerWidth;
        if(clientWidth != size) {
            setSize(clientWidth);
        }
    }
    useEffect (()=>{
        if (scrollerRef.current) {
            const a = scrollerRef.current.scrollWidth / 2, b = window.innerWidth / 2;
            const offset = a - b;
            scrollerRef.current.scroll({left: offset, behavior:"instant"});
        }
    },[size])
    useEffect(()=>{
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize)
    }, [])
    const handleScroll = (direction: number) => {
        if (scrollerRef.current) {
            const children = Array.from(scrollerRef.current.children);

            let currentIndex: number;
            const middleScroll = scrollerRef.current.scrollWidth / 2 - window.innerWidth / 2;

            if (scrollerRef.current.scrollLeft === 1) {
                currentIndex = 0;
            } else if (scrollerRef.current.scrollLeft === middleScroll) {
                currentIndex = 1;
            } else {
                currentIndex = 2;
            }
            const nextIndex = currentIndex + direction;
            console.log(scrollerRef.current.scrollLeft,currentIndex, nextIndex)
            if ((nextIndex < 0) || (nextIndex > 2)) {
                return;
            }
            children[currentIndex + direction].scrollIntoView({behavior:"smooth", inline:"center", block:"nearest"});
        }
    }
    return (
        <section className={styles.projectsContainer} >
            <Line />
            <h1 className="title">{TEXT.projects.title[lang === "en" ? 0 : 2]}<span>{TEXT.projects.title[lang === "en" ? 1 : 3]}</span></h1>
            <article className={styles.cards} ref={scrollerRef}> {/*antes section*/}
                {PROJECTS.map((project,i)=>
                    i<3 && <Card project={project} key={project.title}/>
                )}
            </article>
            <img width={60} height={60} className={`${styles.arrow} ${styles.arrowL} monoIcons`} src={ICONS.arrow[0]} alt={ICONS.arrow[1]} onClick={()=>handleScroll(-1)}></img>
            <img width={60} height={60} className={`${styles.arrow} ${styles.arrowR} monoIcons`} src={ICONS.arrow[0]} alt={ICONS.arrow[1]} onClick={()=>handleScroll(1)}></img>
            <Button withText={TEXT.projects.cta[langIndex]} onClick={()=>navigate("/portfolio")}/>
        </section>
    )
}