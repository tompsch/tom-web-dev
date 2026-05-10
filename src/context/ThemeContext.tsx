import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme,
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}
const ThemeContext = createContext<ThemeContextType | undefined>({theme:"dark", setTheme: () => {}});

// const browserLang = navigator.language === "es-ES" ? "spanish" : "english";


export const ThemeProvider = ({children}:{children: React.ReactNode}) => {
    const [theme,setTheme] = useState<Theme>("dark");

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add('light')
        } else {
            document.documentElement.classList.remove('light')
        }
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