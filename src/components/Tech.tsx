import styles from "./Tech.module.css"
import { HERO_ICONS } from "../constants"

export default function Tech () {
    return (
        <div className={styles.container}>
            <ul>
                {HERO_ICONS.map((icon) => <li key={icon[0]} ><img src={icon[0]} alt={icon[1]}></img></li>)}
            </ul>
            <ul className={styles.extraUl}>
                {HERO_ICONS.map((icon) => <li key={icon[0]} ><img src={icon[0]} alt={icon[1]}></img></li>)}
            </ul>
            <ul className={styles.extraUl}>
                {HERO_ICONS.map((icon) => <li key={icon[0]} ><img src={icon[0]} alt={icon[1]}></img></li>)}
            </ul>
        </div>
    )
}