import styles from "./AboutPage.module.css"
import { useEffect } from "react";
import { SOCIALS, ICONS, PICTURES } from "../constants";

type IconKey = keyof typeof ICONS;
const displayIcons = (selectionString: IconKey []) => {
    return (
        <>
            {selectionString.map((name: IconKey)=>
                <img src={ICONS[name][0]} alt={ICONS[name][1]} key={name}/>
            )}
        </>
    )
}
const techStacks: [string, IconKey[]][] =
    [
    ["Languages",["javascript","typescript","python"]],
    ["Frameworks & Libraries",["react","jest"]],
    ["Markup & Styling",["html","css","bootstrap"]],
    ["Tools & Others",["vscode","npm","git","github","vite","figma"]],
];

export default function AboutPage () {
useEffect(()=>{
    window.scrollTo(0,0);
},[])
    return (
        <section className={styles.experienceContainer}>
            <h1 className="title">About m<span>e</span></h1>
            <article className={styles.picAndData}>
                <img src={PICTURES.bioPic[0]} alt={PICTURES.bioPic[1]}></img>
                <div className={styles.mainInfo}>
                    <div className={styles.mainHeaders}>
                        <h2>Tomás Puebla Schildknecht</h2>
                        <h3>Front-end web developer · Bilingual (EN/ES)</h3>
                        <div className={styles.location}>
                            <h3>Argentina</h3>
                            <img className={"monoIcons"} src={ICONS.pin[0]} alt={ICONS.pin[1]}></img>
                        </div>
                    </div>
                    <div className={styles.personalLinks}>
                        <img className={"monoIcons"} src={ICONS.home[0]} alt={ICONS.home[1]} />
                        <a href="https://tompsch.dev" target="_blank" rel="noopener noreferrer" ><h4>tompsch.dev</h4></a>
                        <img className={"monoIcons"} src={SOCIALS[1].icon} alt={SOCIALS[1].alt} />
                        <a href={SOCIALS[1].url} target="_blank" rel="noopener noreferrer" ><h4>/tompsch</h4></a>
                        <img className={"monoIcons"} src={SOCIALS[0].icon} alt={SOCIALS[1].alt} />
                        <a href={SOCIALS[0].url} target="_blank" rel="noopener noreferrer" ><h4>in/tompsch</h4></a>
                    </div>
                </div>

                <div className={styles.aboutText}>
                    <p>I'm a former computer and electronics engineering student and an avid, passionate technology enthusiast.</p>
                    <p>Before transitioning into web development, I worked as a musician and music professor at schools and academies, which strengthened my communication and problem-solving skills, my patience and my passion for continuous learning.</p>
                    <p>I specialize in building modern and responsive interfaces using
                        <span> React, TypeScript, JavaScript, HTML, CSS, and Jest, </span>
                        and I'm currently expanding my knowledge in back-end development with
                        <span> Python and Django </span>
                        to move toward full-stack engineering.
                    </p>
                </div>
            </article>
            <article className={styles.techStack}>
                <h2>TECH STACK</h2>
                <div className={styles.allStacks}>
                    {techStacks.map((tech)=> {
                        return (
                        <div className={styles.stack} key={tech[0]}>
                            <h3>{tech[0]}</h3>
                            <div className={styles.icons}>
                                {displayIcons(tech[1])}
                            </div>
                        </div>
                        )}
                    )}
                </div>
            </article>
        </section>
    )
}