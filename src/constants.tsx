import littlelemonPic from "./assets/little_lemon.png"
import musicPic from "./assets/tom_music.png"
import salonPic from "./assets/hair_day.png"
import hairdayWide from "./assets/hairday_wide.png"
import littlelemonWide from "./assets/littlelemon_wide.png"
import musicWide from "./assets/musicWide.png"
import linkedin from "./assets/linkedin 1.svg"
import github from "./assets/github3.svg"
import mail from "./assets/email 1.svg"

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
    web:"https://hairdayboutique.netlify.app/",
    repository: "https://github.com/tompsch/hair-day"
}
]

export const SOCIALS = [
    {
        icon: linkedin,
        alt: "Linkedin icon",
        url: "https://www.linkedin.com/in/tompsch/"
    },
    {
        icon: github,
        alt: "GitHub icon",
        url: "https://github.com/tompsch"
    },
    {
        icon: mail,
        alt: "E-mail icon",
        url: "mailto:hello@tompsch.dev"
    }
]