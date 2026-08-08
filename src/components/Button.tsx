import styles from "./Button.module.css"

interface ButtonProps {
    withText:string,
    type?: "submit" | "reset" | "button" | undefined,
    disabled?: boolean
    onClick?: () => void
}

export default function Button ({withText, type, disabled, onClick}: ButtonProps ) {
    return (
        <button className={`${styles.mainButton} ${disabled ? styles.disabled : ""}`} type={type} disabled={disabled} onClick={onClick}>
            <span className={styles.buttonText}>{withText}</span>
            <span className={styles.buttonArrow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true" ><path fill="currentColor" stroke="currentColor" stroke-width="0.13" d="m12.57 4.205 7.477 7.75.043.045-.043.045-7.478 7.75-.046.047-.046-.045-.734-.71-.046-.044.045-.047 6.195-6.42H3.935v-1.151h14.003l-6.196-6.421-.045-.047.046-.045.734-.709.046-.045z"></path></svg>
            </span>
        </button>
    )
}