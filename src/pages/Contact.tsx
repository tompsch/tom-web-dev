import styles from "./Contact.module.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import Button from "../components/Button"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { useLang } from "../context/LangContext"
import { TEXT } from "../constants"


export default function Contact () {
    const { lang } = useLang();
    const langIndex = lang === "en" ? 0 : 1;
    const navigate = useNavigate();
    const textRef = useRef<HTMLTextAreaElement>(null);
    const formValidation = Yup.object().shape({
        name: Yup.string().min(2,TEXT.contactPage.errors[lang][0]).max(30,TEXT.contactPage.errors[lang][1]).matches(/^[^0-9]+$/, TEXT.contactPage.errors[lang][2]).required(TEXT.contactPage.errors[lang][3]),
        email: Yup.string().email(TEXT.contactPage.errors[lang][4]).required(TEXT.contactPage.errors[lang][3]),
        message: Yup.string().min(20,TEXT.contactPage.errors[lang][5]).max(1500,TEXT.contactPage.errors[lang][6]).required(TEXT.contactPage.errors[lang][3]),

    })
    const netlifySubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData as any).toString()
        })
        .then((response) => {
            if (!response.ok) throw new Error(TEXT.contactPage.subError[langIndex])
            navigate("/confirmation")})
        .catch(error => alert(error));
    }

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    useEffect(()=>{
        if(!formik) {return}
        (formik.errors.name && formik.touched.name) && formik.setFieldTouched("name",true);
        (formik.errors.email && formik.touched.email) && formik.setFieldTouched("email",true);
        (formik.errors.message && formik.touched.message) && formik.setFieldTouched("message",true);
        }
    ,[lang])
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
            <h1 className="title">{TEXT.contactPage.title[lang === "en" ? 0 : 2]}<span>{TEXT.contactPage.title[lang === "en" ? 1 : 3]}</span></h1>
            <h2>{TEXT.contactPage.subtitle[langIndex]}</h2>
            <h3>{TEXT.contactPage.doubleSubtitle[langIndex]}</h3>
            <form onSubmit={netlifySubmit} name="contact" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <p className={styles.hidden}>
                    <label>
                    Don not fill this out if you are human: <input name="bot-field" type="text" />
                    </label>
                </p>
                <label htmlFor="name">{TEXT.contactPage.name[langIndex]}</label>
                <input
                    id="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}

                <label htmlFor="email">{TEXT.contactPage.email[langIndex]}</label>
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps('email')}

                />
                {formik.touched.email && formik.errors.email && <div className={styles.error}>{formik.errors.email}</div>}

                <label htmlFor="message">{TEXT.contactPage.message[langIndex]}</label>
                <textarea
                    id="message"
                    ref={textRef}
                    maxLength={1501}
                    {...formik.getFieldProps('message')}
                />
                {formik.touched.message && formik.errors.message && <div className={styles.error}>{formik.errors.message}</div>}
                <Button
                    withText={TEXT.contactPage.submit[langIndex]}
                    type="submit"
                    disabled={!formik.dirty || !formik.isValid}
                    />
            </form>
        </section>
  )
}