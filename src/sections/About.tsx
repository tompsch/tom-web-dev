import styles from "./About.module.css"
import Line from "../components/Line"
import Button from "../components/Button"
import aboutPic from "../assets/tom_about.webp"

export default function About ({ref}:{ref:React.Ref<HTMLElement>}) {
    return (
        <section className={styles.aboutContainer} ref={ref}>
            <Line />
            <h1 className="title">About m<span>e</span></h1>
            <article className={styles.picAndData}>
                <img src={aboutPic}></img>
                <div className={styles.mainInfo}>
                    <div className={styles.mainHeaders}>
                        <h2>Tomás Puebla Schildknecht</h2>
                        <h3>junior front-end web developer with a
                            strong background in music and education</h3>
                    </div>
                    <Button withText="my experience" />
                </div>

                <div className={styles.aboutText}>
                    <p>I'm a former computer and electronics engineering student and an avid, passionate technology enthusiast.</p>
                    <p>Before transitioning into software development, I worked as a musician and music professor at schools and academies, which strengthened my communication and problem-solving skills, my patience and my passion for continuous learning.</p>
                    <p>I specialize in building modern and responsive interfaces using
                        <span> React, TypeScript, JavaScript, HTML, CSS, and Jest, </span>
                        and I'm currently expanding my knowledge in back-end development with
                        <span> Python and Django </span>
                        to move toward full-stack engineering.
                    </p>
                </div>
            </article>
        </section>
    )
}