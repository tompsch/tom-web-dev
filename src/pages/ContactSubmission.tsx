import styles from "./Contact.module.css"
import { Link } from "react-router"
import Button from "../components/Button"
import { TEXT } from "../constants"
import { useLang } from "../context/LangContext"

export default function ContactSubmission () {
  const { lang } = useLang();
  const langIndex = lang === "en" ? 0 : 1;
  return (
    <section className={styles.contactContainer + " " + styles.confirmation}>
        <h1 className="title">{TEXT.confirmationPage.title[lang === "en" ? 0 : 2]}<span>{TEXT.confirmationPage.title[lang === "en" ? 1 : 3]}</span></h1>
        <h2>{TEXT.confirmationPage.subtitle[langIndex]}</h2>
        <h3>{TEXT.confirmationPage.doubleSubtitle[langIndex]}</h3>
        <Link to="/"><Button withText={TEXT.confirmationPage.cta[langIndex]}/></Link>
    </section>
  )
}
