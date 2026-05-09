import styles from "./Contact.module.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import Button from "../components/Button"
import { useEffect, useRef } from "react"

const formValidation = Yup.object().shape({
    name: Yup.string().min(2,"Please enter a valid name").max(30,"Maximum 30 characters").matches(/^[^0-9]+$/, "Numbers are not allowed in this field").required("Required"),
    email: Yup.string().email('Please enter a valid email').required('Required'),
    message: Yup.string().min(20,"Please enter at least 20 characters").max(1500,"1500 characters maximum. Need more space? Send me an email!").required("Required"),

})

export default function Contact () {
    const formik = useFormik({
        initialValues: {name:"",email:"",message:""},
        validationSchema: formValidation,
        onSubmit: values => console.log(values)
    });
    const textRef = useRef<HTMLTextAreaElement>(null);

    useEffect(()=>{
        if(textRef.current) {
            console.log(textRef.current.scrollHeight)
            textRef.current.style.height = "auto";
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    },[formik.values.message])
    return (
        <section className={styles.contactContainer}>
            <h1 className="title">Contact m<span>e</span></h1>
            <h2>Have a project or an idea?</h2>
            <h3>Get in touch! I am currently open for new opportunities!</h3>
            <form onSubmit={formik.handleSubmit}>
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

                <Button withText="Let's talk" type="submit" disabled={!formik.dirty || !formik.isValid}/>
            </form>
        </section>
  )
}