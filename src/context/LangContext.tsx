import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

type Lang = 'en' | 'es';

type LangContextType = {
  lang: Lang,
  setLang: React.Dispatch<React.SetStateAction<Lang>>

}
const browserLanguage =
  navigator.languages?.[0] ||
  navigator.language ||
  "en";
const savedLang = localStorage.getItem("language");

let language: Lang = (savedLang === "es" || savedLang === "en") ?
savedLang :
browserLanguage.startsWith("es") ? "es" : "en";

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({children}:{children: React.ReactNode}) => {
    const [lang,setLang] = useState<Lang>(language);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const targetPrefix = lang === "es" ? "/es" : "";
        const withoutLang = currentPath.replace(/^\/es(?=\/|$)/, "") || "/";
        const goTo = withoutLang === "/" && targetPrefix ? targetPrefix : targetPrefix + withoutLang;
        if(currentPath !== goTo) {
            navigate(goTo, { replace: true});
        }
    }, [lang, location.pathname, navigate])

    return (
        <LangContext.Provider value={{lang,setLang}}>
            {children}
        </LangContext.Provider>
);

};

export const useLang = () => {
  const context = useContext(LangContext)
  if (!context) throw new Error('useLang must be used within a LangProvider')
  return context;
}