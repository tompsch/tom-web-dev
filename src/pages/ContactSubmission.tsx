import styles from "./Contact.module.css"
import { Link } from "react-router"
import Button from "../components/Button"


export default function ContactSubmission () {
  return (
    <section className={styles.contactContainer + " " + styles.confirmation}>
        <h1 className="title">Contact m<span>e</span></h1>
        <h2>Thank you for your message!</h2>
        <h3>I will get back to you shortly</h3>
        <Link to="/"><Button withText="back home"/></Link>
    </section>
  )
}
