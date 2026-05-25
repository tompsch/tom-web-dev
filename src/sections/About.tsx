import styles from "./About.module.css"
import Line from "../components/Line"
import Button from "../components/Button"
import { useNavigate } from "react-router"
import { PICTURES, ICONS, TEXT } from "../constants"
import { useLang } from "../context/LangContext"

export default function About () {
    const { lang } = useLang();
    const langIndex = lang === "en" ? 0 : 1;
    const navigate = useNavigate();
    return (
        <section className={styles.aboutContainer}>
            <Line />
            <h1 className="title">{TEXT.about.title[lang === "en" ? 0 : 2]}<span>{TEXT.about.title[lang === "en" ? 1 : 3]}</span></h1>
            <article className={styles.picAndData}>
                <img loading="lazy" width={264} height={264} src={PICTURES.bioPic[0]} alt={PICTURES.bioPic[1]} className={styles.aboutPic}></img>
                <div className={styles.mainInfo}>
                    <div className={styles.mainHeaders}>
                        <h2>Tomás Puebla Schildknecht</h2>
                        <h3>{TEXT.about.subtitle[langIndex]}</h3>
                    </div>
                    <Button withText={TEXT.about.cta[langIndex]} onClick={()=>navigate("/about")}/>

                </div>
                <div className={styles.secondaryInfo}>
                    <div className={styles.bulletIcons}>
                        <img width={41} height={41} src={ICONS.reactWhite[0]} alt={ICONS.reactWhite[1]} className="monoIcons"/>
                        <p><span>{TEXT.about.react[langIndex]}</span>{TEXT.about.reactTwo[langIndex]}</p>
                    </div>
                    <div className={styles.bulletIcons}>
                        <img width={41} height={41} src={ICONS.backEnd[0]} alt={ICONS.backEnd[1]} className="monoIcons"/>
                        <p><span>{TEXT.about.python[langIndex]}</span>{TEXT.about.pythonTwo[langIndex]}</p>
                    </div>
                    <div className={styles.bulletIcons}>
                        <img width={41} height={41} src={ICONS.gears[0]} alt={ICONS.gears[1]} className="monoIcons"/>
                        <p><span>{TEXT.about.gears[langIndex]}</span>{TEXT.about.gearsTwo[langIndex]}</p>
                    </div>
                    <div className={styles.bulletIcons}>
                        <img width={41} height={41} src={ICONS.creativity[0]} alt={ICONS.creativity[1]} className="monoIcons"/>
                        <p><span>{TEXT.about.creativity[langIndex]}</span>{TEXT.about.creativityTwo[langIndex]}</p>
                    </div>
                </div>
            </article>
        </section>
    )
}