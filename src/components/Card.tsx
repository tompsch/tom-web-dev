import styles from "./Card.module.css"
import { useInView } from "react-intersection-observer"
import { useNavigate } from "react-router";
import { useLang } from "../context/LangContext";

export default function Card ({project}: {project:{title: string, titleEs: string, pic: string, widePic: string, alt: string, altEs: string}}) {
    const { lang } = useLang();
    const navigate = useNavigate();
    const [ ref, inView ] = useInView({
        threshold: 1,
    });

    return (
        <article onClick={()=>navigate("portfolio")} className={`${styles.card} ${inView ? styles.inView : styles.notInView}`} ref={ref}>
            <h3>{lang === "en" ? project.title : project.titleEs}</h3>
            <img loading="lazy" width={336} height={310} src={project.pic} alt={lang === "en" ? project.alt : project.altEs}></img>
        </article>
    )
}