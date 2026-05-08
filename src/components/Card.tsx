import styles from "./Card.module.css"
import { useInView } from "react-intersection-observer"

export default function Card ({project}: {project:{title: string, pic: string, widePic: string, alt: string}}) {

const [ ref, inView ] = useInView({
    threshold: 1,
});

    return (
        <article className={`${styles.card} ${inView ? styles.inView : styles.notInView}`} ref={ref}>
            <h3>{project.title}</h3>
            <img src={project.pic} alt={project.alt}></img>
        </article>
    )
}