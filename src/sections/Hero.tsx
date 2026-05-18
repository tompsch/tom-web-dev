import { useState, useEffect } from "react";
import styles from "./Hero.module.css"
import Tech from "../components/Tech";
import ThreeAnimation from "../components/ThreeAnimation";

const roleStr = `< react web developer />`;
const canUseWebGL = (): boolean => {
    // return false;
    try {
        const canvas = document.createElement("canvas");
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
    } catch {
        return false;
    }
}
const isMobile = 'ontouchstart' in window;
console.log(isMobile)
const webGLSupport = canUseWebGL();
export default function Hero () {
    const [role, setRole] = useState("")
    const [typeEnding, setTypeEnding] = useState(false)
    const [blink, setBlink] = useState(true)
    const [restart, setRestart] = useState(false)

    const getNumberArray = () => {
        let array = []
        for (let i = 0; i < roleStr.length; i++) {
            array.push(Math.floor(Math.random() * 175 + 75));
        }
        return array;
    }
    const delayArray = useRandom();

    function useRandom() {
        const [randArray, setRandArray] = useState(getNumberArray)
        useEffect(()=>{
            const numArray = getNumberArray();
            setRandArray(numArray);
        },[restart])
        return randArray;
    }

    const callRole = async () => {
        let newString = role;

        await document.fonts.load("1.25rem HeroFontThree");
        for (const [i,char] of Array.from(roleStr).entries()) {
            newString = newString + char;
            const delay = delayArray[i]
            await new Promise((resolve) => setTimeout(()=>resolve(setRole(newString)),delay));
        }
        setTypeEnding(true);
        await new Promise((resolve) => setTimeout(()=>resolve(setRole("")),5000));
        setTypeEnding(false);
        setRestart(!restart);
    }
    useEffect(()=>{
        callRole();
    },[restart])

    useEffect(()=>{
        if(typeEnding) {
            var interval = setInterval(()=>setBlink(!blink),600);
        }
        return ()=>clearInterval(interval);
    })
    return (
        <main className={webGLSupport ? styles.webGLContainer : styles.heroContainer}>
            <div className={webGLSupport ? styles.webGLpresentation : styles.presentation}>
                {webGLSupport ? <ThreeAnimation /> :
                <div className={styles.textWrapper}>
                     <h2 className={styles.heroTwo}>I´m </h2>
                     <h1 className={styles.heroOne}>Tom</h1>
                 </div>}
                <h6 className={styles.heroSix + " " + (blink ? styles.blinkingCaret : "")}>{role}</h6>

            </div>
            <Tech />
        </main>
    )
}
