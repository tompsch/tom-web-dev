import styles from "./Projects.module.css"
import Card from "../components/Card"
import Button from "../components/Button"
import littlelemonPic from "../assets/little_lemon.png"
import musicPic from "../assets/tom_music.png"
import salonPic from "../assets/hair_day.png"
import arrow from "../assets/left-arrow.svg"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import Line from "../components/Line"

const projects = [
    {title: "resto website",
    pic: littlelemonPic,
    alt: "Little Lemon's website"
},
{title: "music portfolio",
    pic: musicPic,
    alt: "Tom's music website"
},
{title: "boutique salon",
    pic: salonPic,
    alt: "Hair Day Boutique Salon's  website"
}
]

export default function Projects ({ref}:{ref:React.Ref<HTMLElement>}) {
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
        <section className={styles.projectsContainer} ref={ref}>
            <Line />
            <h1 className="title">Project<span>s</span></h1>
            <article className={styles.cards} ref={scrollerRef}> {/*antes section*/}
                {projects.map((project)=>
                    <Card project={project} key={project.title}/>
                )}
            </article>
            <img className={`${styles.arrow} + ${styles.arrowL}`} src={arrow} onClick={()=>handleScroll(-1)}></img>
            <img className={`${styles.arrow} + ${styles.arrowR}`} src={arrow} onClick={()=>handleScroll(1)}></img>
            <Link to="portfolio"><Button withText="full portfolio"/></Link>
        </section>
    )
}