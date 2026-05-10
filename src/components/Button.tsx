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
            {withText}
        </button>
    )
}