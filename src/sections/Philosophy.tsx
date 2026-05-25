import styles from "./Philosophy.module.css"
import Button from "../components/Button"
import Line from "../components/Line"
import { useNavigate } from "react-router";
import { TEXT } from "../constants";
import { useLang } from "../context/LangContext";

export default function Philosophy () {
    const { lang } = useLang();
    const langIndex = lang === "en" ? 0 : 1;
    const navigate = useNavigate();
    return (
        <section className={`${styles.philosophyContainer} philosophy`}>
            <Line />
            <h1 className="title">{TEXT.philosophy.title[lang === "en" ? 0 : 2]}<span>{TEXT.philosophy.title[lang === "en" ? 1 : 3]}</span></h1>
            <article className={styles.subContainer}>
                <div className={styles.dynamicText}>
                    <div>
                        <p>{TEXT.philosophy.building[langIndex]}</p>
                        <div className={styles.roller}>
                            {(lang === "en" ? TEXT.philosophy.elements : TEXT.philosophy.elementsEs).map(el => <p className={styles.rollerElement} key={el}>{el}</p>)}
                        </div>
                    </div>
                    <p>{TEXT.philosophy.web[langIndex]}</p>
                    <div>
                        <p>{TEXT.philosophy.code[langIndex]}</p><span className={styles.italic}>{TEXT.philosophy.design[lang === "en" ? 0 : 1]}</span>
                    </div>

                </div>
                <Button withText={TEXT.philosophy.cta[langIndex]} onClick={()=>navigate("/contact")}/>
            </article>
        </section>
    )
}