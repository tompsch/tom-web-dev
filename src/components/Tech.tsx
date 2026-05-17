import styles from "./Tech.module.css"
import { useEffect, useState } from "react"
import { HERO_ICONS } from "../constants"


export default function Tech () {
const [smallScreen, setSmallScreen] = useState(false)
const [resize, setResize] = useState(false)

useEffect(() => {
    if(window.innerWidth <= 700) {
        setSmallScreen(true);
    } else {
        setSmallScreen(false);
    }
},[resize])

useEffect(()=>{
    window.addEventListener("resize",handleResize);
    return ()=>window.removeEventListener("resize",handleResize);
},)
const handleResize = ()=>{
    setResize(!resize);
}
    return (
        <div className={styles.container}>
            <ul>
                {HERO_ICONS.map((icon) => <li key={icon[0]} ><img src={icon[0]} alt={icon[1]}></img></li>)}
            </ul>
            <ul>
                {smallScreen && HERO_ICONS.map((icon) => <li key={icon[0]} ><img src={icon[0]} alt={icon[1]}></img></li>)}
            </ul>
            <ul>
                {smallScreen && HERO_ICONS.map((icon) => <li key={icon[0]} ><img src={icon[0]} alt={icon[1]}></img></li>)}
            </ul>
        </div>
    )
}