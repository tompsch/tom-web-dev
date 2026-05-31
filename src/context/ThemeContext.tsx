import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme,
  setTheme: React.Dispatch<React.SetStateAction<Theme>>

}
const prefLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const savedTheme = localStorage.getItem("theme");
const initialTheme = (savedTheme === "dark" || savedTheme === "light") ? savedTheme : (prefLight ? "light" : "dark");
export const ThemeProvider = ({children}:{children: React.ReactNode}) => {
    const [theme,setTheme] = useState<Theme>(initialTheme);

    useEffect (()=>{
        if (savedTheme) return;
        const themeQuery = window.matchMedia('(prefers-color-scheme: light)');
        const handleThemeChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? "light" : "dark");
        }
        themeQuery.addEventListener("change",handleThemeChange);
        return () => themeQuery.removeEventListener("change",handleThemeChange);
    },[])


    useEffect(() => {
        document.documentElement.classList.toggle(
            "light",
            theme === "light"
        );

        localStorage.setItem("theme", theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
);

};

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context;
}