import styles from "./Button.module.css"

interface ButtonProps {
    withText:string,
    type?: "submit" | "reset" | "button" | undefined,
    disabled?: boolean
}

export default function Button ({withText, type, disabled}: ButtonProps ) {
    return (
        <button className={styles.mainButton} type={type} disabled={disabled}>
            {withText}
        </button>
    )
}