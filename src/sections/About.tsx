import styles from "./About.module.css"
import Line from "../components/Line"
import Button from "../components/Button"
import { Link } from "react-router"
import { PICTURES, ICONS } from "../constants"

export default function About ({ref}:{ref:React.Ref<HTMLElement>}) {
    return (
        <section className={styles.aboutContainer} ref={ref}>
            <Line />
            <h1 className="title">About m<span>e</span></h1>
            <article className={styles.picAndData}>
                <img src={PICTURES.bioPic[0]} alt={PICTURES.bioPic[1]} className={styles.aboutPic}></img>
                <div className={styles.mainInfo}>
                    <div className={styles.mainHeaders}>
                        <h2>Tomás Puebla Schildknecht</h2>
                        <h3>front-end web developer with a
                            strong background in music and education</h3>
                    </div>
                    <Link to="about"><Button withText="learn more" /></Link>

                </div>
                <div className={styles.secondaryInfo}>
                    <div className={styles.bulletIcons}>
                        <img src={ICONS.reactWhite[0]} alt={ICONS.reactWhite[1]}/>
                        <p><span>Front-end development with React</span> — crafting responsive, clean, and performant UIs</p>
                    </div>
                    <div className={styles.bulletIcons}>
                        <img src={ICONS.backEnd[0]} alt={ICONS.backEnd[1]} />
                        <p><span>Expanding into full-stack</span> with Python and Django</p>
                    </div>
                    <div className={styles.bulletIcons}>
                        <img src={ICONS.gears[0]} alt={ICONS.gears[1]} />
                        <p><span>Building real-world side projects</span> to sharpen both ends of the stack</p>
                    </div>
                    <div className={styles.bulletIcons}>
                        <img src={ICONS.creativity[0]} alt={ICONS.creativity[1]} />
                        <p><span>Former teacher and musician</span> — bringing clarity, creativity, and a love for connecting the dots to every project</p>
                    </div>
                </div>
            </article>
        </section>
    )
}