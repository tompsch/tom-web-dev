import littlelemonPic from "./assets/little_lemon.png"
import musicPic from "./assets/tom_music.png"
import salonPic from "./assets/hair_day.png"
import hairdayWide from "./assets/hairday_wide.png"
import littlelemonWide from "./assets/littlelemon_wide.png"
import musicWide from "./assets/musicWide.png"
import linkedin from "./assets/linkedin 2.svg"
import mail from "./assets/email 1.svg"
import externalLink from "./assets/externalLink.svg"
import aboutPic from "./assets/tom_about.webp"
import css from "./assets/tech_svg/css.svg"
import html from "./assets/tech_svg/html.svg"
import py from "./assets/tech_svg/python.svg"
import js from "./assets/tech_svg/javascript.svg"
import react from "./assets/tech_svg/react.svg"
import ts from "./assets/tech_svg/typescript.svg"
import bootstrap from "./assets/tech_svg/bootstrap.svg"
import jest from "./assets/tech_svg/jest.svg"
import vite from "./assets/tech_svg/vite.svg"
import github from "./assets/tech_svg/github.svg"
import vscode from "./assets/tech_svg/vscode.svg"
import figma from "./assets/tech_svg/figma.svg"
import npm from "./assets/tech_svg/npm.svg"
import git from "./assets/tech_svg/git.svg"
import home from "./assets/home.svg"
import reactWhite from "./assets/bullet_icons/react.png"
import backEnd from "./assets/bullet_icons/back-end.png"
import creativity from "./assets/bullet_icons/creativity.png"
import gears from "./assets/bullet_icons/gears.png"
import islander from "./assets/footer_pic.jpeg"
import pin from "./assets/pin.svg"
import arrow from "./assets/left-arrow.svg"
import theme from "./assets/themeIcon.svg"


export const HERO_ICONS = [
    [html,"HTML"],
    [css,"CSS"],
    [py,"Python"],
    [js,"JavaScript"],
    [react,"React"],
    [ts,"TypeScript"],
    [jest,"Jest"],
    [bootstrap,"Boostrap"],
    [vite,"Vite"],
]

export const ICONS = {
    home: [home, "Home"],
    python: [py,"Python"],
    javascript: [js,"JavaScript"],
    react: [react,"React"],
    typescript: [ts,"TypeScript"],
    jest: [jest,"Jest"],
    bootstrap: [bootstrap,"Boostrap"],
    vite: [vite,"Vite"],
    github: [github,"GitHub"],
    vscode: [vscode,"VSCode"],
    figma: [figma,"Figma"],
    npm: [npm,"Figma"],
    html: [html,"HTML"],
    css: [css,"CSS"],
    git: [git,"Git"],
    externalLink: [externalLink,"External link"],
    backEnd: [backEnd,"Database"],
    creativity: [creativity,"Creativity"],
    reactWhite: [reactWhite,"React"],
    gears: [gears,"Gears"],
    pin: [pin, "Location pin"],
    arrow: [arrow, "Arrow"],
    theme: [theme, "Dark-light"]
}

export const PICTURES = {
    bioPic: [aboutPic, "Tom"],
    islander: [islander, "Delta house"], 

}

export const PROJECTS = [
    {title: "resto website",
    pic: littlelemonPic,
    widePic: littlelemonWide,
    fullTitle: "Mediterranean restaurant website / ",
    description: "React web application bootstrapped with create-react-app, using form validation libraries such as Formik and Yup and real form submission",
    alt: "Little Lemon's website",
    web: "https://chicagolittlelemon.netlify.app",
    repository: "https://github.com/tompsch/little-lemon",
},
{title: "music portfolio",
    pic: musicPic,
    widePic: musicWide,
    fullTitle: "Musician online portfolio / ",
    description: "React web application bootstrapped create-react-app and styled and animated with plain CSS",
    alt: "Tom's music website",
    web: "https://tompsch.com/",
    repository: "https://github.com/tompsch/tom-music",
},
{title: "boutique salon",
    pic: salonPic,
    widePic: hairdayWide,
    fullTitle: "Boutique salon landing page / ",
    description: "Static HTML and CSS demo webpage built with iframes and animations",
    alt: "Hair Day Boutique Salon's  website",
    web:"https://tompsch.github.io/hairday/",
    repository: "https://github.com/tompsch/hair-day"
}
]

export const SOCIALS = [
    {
        icon: linkedin,
        alt: "Linkedin",
        url: "https://www.linkedin.com/in/tompsch/"
    },
    {
        icon: github,
        alt: "GitHub",
        url: "https://github.com/tompsch"
    },
    {
        icon: mail,
        alt: "E-mail",
        url: "mailto:hello@tompsch.dev"
    }
]