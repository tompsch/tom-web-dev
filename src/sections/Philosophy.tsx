import styles from "./Philosophy.module.css"
import Button from "../components/Button"
import Line from "../components/Line"
import { useNavigate } from "react-router";

const elements = ["modern","responsive","performant","accesible","intuitive","modular","scalable","secure","reliable"];

export default function Philosophy () {
    const navigate = useNavigate();
    return (
        <section className={`${styles.philosophyContainer} philosophy`}>
            <Line />
            <h1 className="title">Philosoph<span>y</span></h1>
            <article className={styles.subContainer}>
                <div className={styles.dynamicText}>
                    <div>
                        <p>Building</p>
                        <div className={styles.roller}>
                            {elements.map(el => <p className={styles.rollerElement} key={el}>{el}</p>)}
                        </div>
                    </div>
                    <p>web experiences with </p>
                    <div>
                        <p>clean code and</p><span className={styles.italic}> thoughtful design.</span>
                    </div>

                </div>
                <Button withText="work with me" onClick={()=>navigate("/contact")}/>
            </article>
        </section>
    )
}