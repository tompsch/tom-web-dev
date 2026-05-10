import styles from "./Contact.module.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import Button from "../components/Button"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"

const formValidation = Yup.object().shape({
    name: Yup.string().min(2,"Please enter a valid name").max(30,"Maximum 30 characters").matches(/^[^0-9]+$/, "Numbers are not allowed in this field").required("Required"),
    email: Yup.string().email('Please enter a valid email').required('Required'),
    message: Yup.string().min(20,"Please enter at least 20 characters").max(1500,"1500 characters maximum. Need more space? Send me an email!").required("Required"),

})

export default function Contact () {
    const navigate = useNavigate();
    const textRef = useRef<HTMLTextAreaElement>(null);

    const netlifySubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData as any).toString()
        })
        .then((response) => {
            if (!response.ok) throw new Error('Oops! Form submission failed. Try again!')
            navigate("/confirmation")})
        .catch(error => alert(error));
    }

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    const formik = useFormik({
        initialValues: {name:"",email:"",message:""},
        validationSchema: formValidation,
        onSubmit: () =>{}
    });

    useEffect(()=>{
        if(textRef.current) {
            textRef.current.style.height = "auto";
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    },[formik.values.message])
    return (
        <section className={styles.contactContainer}>
            <h1 className="title">Contact m<span>e</span></h1>
            <h2>Have a project or an idea?</h2>
            <h3>Get in touch! I am currently open for new opportunities!</h3>
            <form onSubmit={netlifySubmit} name="contact" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <p className={styles.hidden}>
                    <label>
                    Don not fill this out if you are human: <input name="bot-field" type="text" />
                    </label>
                </p>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}

                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps('email')}

                />
                {formik.touched.email && formik.errors.email && <div className={styles.error}>{formik.errors.email}</div>}

                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    ref={textRef}
                    maxLength={1501}
                    {...formik.getFieldProps('message')}
                />
                {formik.touched.message && formik.errors.message && <div className={styles.error}>{formik.errors.message}</div>}
                <Button
                    withText="Let's talk"
                    type="submit"
                    disabled={!formik.dirty || !formik.isValid}
                    />
            </form>
        </section>
  )
}