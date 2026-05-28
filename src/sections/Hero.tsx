import { useState, useRef, useEffect, lazy, Suspense } from "react";
import styles from "./Hero.module.css"
import Tech from "../components/Tech";
import { TEXT } from "../constants"
const ThreeAnimation = lazy(() => import('../components/ThreeAnimation'));
import { useLang } from "../context/LangContext";

const canUseWebGL = (): boolean => {
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

const webGLSupport = canUseWebGL();
export default function Hero () {
    const { lang } = useLang();
    const langIndex = lang === "en" ? 0 : 1;
    const [role, setRole] = useState("");
    const [typeEnding, setTypeEnding] = useState(false);
    const [blink, setBlink] = useState(true);

    const getNumberArray = () => {
        let array = []
        for (let i = 0; i < TEXT.hero.role[langIndex].length; i++) {
            array.push(Math.floor(Math.random() * 175 + 75));
        }
        return array;
    }
    const delayArrayRef = useRef(getNumberArray());

    const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const typingDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const callIdRef = useRef(0);


    const callRole = async () => {
        const myId = ++callIdRef.current;

        endTimerRef.current && clearTimeout(endTimerRef.current);
        typingDelayRef.current && clearTimeout(typingDelayRef.current);

        if (myId !== callIdRef.current) return;
        await new Promise((r) => setTimeout(r, 0));

        setRole("");
        setTypeEnding(false);
        delayArrayRef.current = getNumberArray();

        let newString = "";
        const text = TEXT.hero.role[langIndex];

        await document.fonts.load("1.25rem HeroFontThree");
        for (const [i,char] of Array.from(text).entries()) {
            if (myId!==callIdRef.current) return;
            newString += char;
            const delay = delayArrayRef.current[i]
            await new Promise((resolve) => {
                typingDelayRef.current = setTimeout(()=>resolve(setRole(newString)),delay)}
        );
        }
        if (myId!==callIdRef.current) return;

        setTypeEnding(true);
        await new Promise<void>((resolve) => {
            endTimerRef.current = setTimeout(()=>{
                if (myId !== callIdRef.current) return;
                setRole("");
                setTypeEnding(false);
                resolve();
            },5000);
        });
        if (myId === callIdRef.current) callRole();
    }

    useEffect(()=>{
        callRole();
        return () => {
            ++callIdRef.current;
            endTimerRef.current && clearTimeout(endTimerRef.current)
            typingDelayRef.current && clearTimeout(typingDelayRef.current)
        }
    },[lang])
    useEffect(()=>{
        if(typeEnding) {
            var interval = setInterval(()=>setBlink(prev => !prev),600);
        }
        return ()=>clearInterval(interval);
    }, [typeEnding])
    return (
        <main className={webGLSupport ? styles.webGLContainer : styles.heroContainer}>
            <div className={webGLSupport ? styles.webGLpresentation : styles.presentation}>
                {webGLSupport ?
                <Suspense fallback={
                    <div id={styles.three} />
                }>
                    <ThreeAnimation />
                </Suspense>
                :
                <div className={styles.textWrapper}>
                     <h2 className={styles.heroTwo}>{TEXT.hero.one[langIndex]}</h2>
                     <h1 className={styles.heroOne}>{TEXT.hero.two[langIndex]}</h1>
                 </div>}
                <h6 className={styles.heroSix + " " + (blink ? styles.blinkingCaret : "")}>{role}</h6>

            </div>
            <Tech />
        </main>
    )
}
