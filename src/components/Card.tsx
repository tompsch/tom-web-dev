import styles from "./Card.module.css"
import { useInView } from "react-intersection-observer"
import { useNavigate } from "react-router";

export default function Card ({project}: {project:{title: string, pic: string, widePic: string, alt: string}}) {
    const navigate = useNavigate();
    const [ ref, inView ] = useInView({
        threshold: 1,
    });

    return (
        <article onClick={()=>navigate("portfolio")} className={`${styles.card} ${inView ? styles.inView : styles.notInView}`} ref={ref}>
            <h3>{project.title}</h3>
            <img src={project.pic} alt={project.alt}></img>
        </article>
    )
}