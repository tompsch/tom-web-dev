import styles from "./AboutPage.module.css"
import { useEffect, useState } from "react";
import { SOCIALS, ICONS, PICTURES, TEXT } from "../constants";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useLang } from "../context/LangContext";

type IconKey = keyof typeof ICONS;


const techStacks: [string, string, IconKey[]][] =
    [
    ["Languages","Lenguajes",["javascript","typescript","python"]],
    ["Frameworks & Libraries","Frameworks y librerías",["react","jest"]],
    ["Markup & Styling","Marcado y estilos", ["html","css","bootstrap", "figma"]],
    ["Tools & Others","Otras herramientas", ["copilot", "npm", "vscode","git","vite","github"]],
];


export default function AboutPage () {
    const { lang } = useLang();
    const langIndex = lang === "en" ? 0 : 1;
    const displayIcons = (selectionString: IconKey []) => {
    return (
        <>
            {selectionString.map((name: IconKey)=>
                <img width={56} height={56} className={name === "github" || name === "copilot" ? "monoIcons" : ""}
                        src={ICONS[name][0]}
                        alt={ICONS[name][1]}
                        key={name}
                        onMouseEnter={()=>setHovered(ICONS[name][1])}
                        onMouseLeave={()=>setHovered("")}/>
            )}
        </>
    )
}
    const [hovered, setHovered] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    return (
        <section className={styles.experienceContainer}>
            <h1 className="title">{TEXT.aboutPage.title[lang === "en" ? 0 : 2]}<span>{TEXT.aboutPage.title[lang === "en" ? 1 : 3]}</span></h1>
            <article className={styles.picAndData}>
                <img width={264} height={264} src={PICTURES.bioPic[0]} alt={PICTURES.bioPic[1]}></img>
                <div className={styles.mainInfo}>
                    <div className={styles.mainHeaders}>
                        <h2>Tomás Puebla Schildknecht</h2>
                        <h3>{TEXT.aboutPage.subtitle[lang === "en" ? 0 : 1]}</h3>
                        <div className={styles.location}>
                            <h3>Argentina</h3>
                            <img className={"monoIcons"} src={ICONS.pin[0]} alt={ICONS.pin[1]}></img>
                        </div>
                    </div>
                    <div className={styles.personalLinks}>
                        <img width={24} height={24} className={"monoIcons"} src={ICONS.home[0]} alt={ICONS.home[1]} />
                        <a href="https://tompsch.dev" target="_blank" rel="noopener noreferrer" ><h4>tompsch.dev</h4></a>
                        <img width={24} height={24} className={"monoIcons"} src={SOCIALS[1].icon} alt={SOCIALS[1].alt} />
                        <a href={SOCIALS[1].url} target="_blank" rel="noopener noreferrer" ><h4>/tompsch</h4></a>
                        <img width={24} height={24} className={"monoIcons"} src={SOCIALS[0].icon} alt={SOCIALS[1].alt} />
                        <a href={SOCIALS[0].url} target="_blank" rel="noopener noreferrer" ><h4>in/tompsch</h4></a>
                    </div>
                </div>

                <div className={styles.aboutText}>
                    <p>{TEXT.aboutPage.one[langIndex]}</p>
                    <p>{TEXT.aboutPage.two[langIndex]}</p>
                    <p>{TEXT.aboutPage.three[langIndex]}
                        <span>{TEXT.aboutPage.four[langIndex]}</span>
                        {TEXT.aboutPage.five[langIndex]}
                        <span>{TEXT.aboutPage.six[langIndex]}</span>
                        {TEXT.aboutPage.seven[langIndex]}
                    </p>
                </div>
            </article>
            <Button withText={TEXT.aboutPage.cta[langIndex]} onClick={()=>navigate("/contact")}/>
            <article className={styles.techStack}>
                <div>
                    <h2>{TEXT.aboutPage.tech[langIndex]}</h2>
                    {hovered && <p>{hovered}</p>}
                </div>
                <div className={styles.allStacks}>
                    {techStacks.map((tech)=> {
                        return (
                            <div className={styles.stack} key={tech[0]}>
                            <h3>{tech[langIndex]}</h3>
                            <div className={styles.icons}>
                                {displayIcons(tech[2])}
                            </div>
                        </div>
                        )}
                    )}
                </div>
            </article>

        </section>
    )
}