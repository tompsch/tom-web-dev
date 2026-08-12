import littlelemonPic from "./assets/little_lemon.webp"
import musicPic from "./assets/tom_music.webp"
import salonPic from "./assets/hair_day.webp"
import hairdayWide from "./assets/hairday_wide.png"
import littlelemonWide from "./assets/littlelemon_wide.png"
import musicWide from "./assets/musicWide.webp"
import linkedin from "./assets/linkedin 2.svg"
import mail from "./assets/email 1.svg"
import externalLink from "./assets/externalLink.svg"
import aboutPic from "./assets/tom_about2.webp"
import css from "./assets/tech_svg/css.svg"
import html from "./assets/tech_svg/html.svg"
import py from "./assets/tech_svg/python.svg"
import js from "./assets/tech_svg/javascript.svg"
import react from "./assets/tech_svg/react.svg"
import ts from "./assets/tech_svg/typescript.svg"
import bootstrap from "./assets/tech_svg/bootstrap4.svg"
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
import islander from "./assets/footer_pic2.webp"
import pin from "./assets/pin.svg"
import arrow from "./assets/left-arrow.svg"
import theme from "./assets/themeIcon.svg"
import copilot from "./assets/tech_svg/copilot.svg"
import webDev from "./assets/webdev.webp"
import webDevWide from "./assets/webdev2.webp"
import themeSun from "./assets/themeSun2.svg"
import themeMoon from "./assets/themeMoon 1.svg"
import django from "./assets/tech_svg/django.svg"
import three_viewer from "./assets/3dviewer.png"
import three_wide from "./assets/3dview_wide.png"

export const HERO_ICONS = [
    [html,"HTML"],
    [django,"Django"],
    [py,"Python"],
    [js,"JavaScript"],
    [react,"React"],
    [ts,"TypeScript"],
    [jest,"Jest"],
    [bootstrap,"Boostrap"],
    [css,"CSS"],
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
    npm: [npm,"NPM"],
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
    copilot: [copilot, "GitHub Copilot"],
    theme: [theme, "Dark-light"],
    themeSun: [themeSun, "Light Mode"],
    themeMoon: [themeMoon, "Dark Mode"],
    django: [django, "Django"],
}

export const PICTURES = {
    bioPic: [aboutPic, "Tom"],
    islander: [islander, "Delta house"], 
}

export const PROJECTS = [
    {title: "model inspector",
        titleEs: "inspector de modelos",
        pic: three_viewer,
        widePic: three_wide,
        fullTitle: "3D model preview and inspection / ",
        fullTitleEs: "Previsualización e inspección de modelos 3D / ",
        description: "React - TypeScript app built with React Three Fiber and Drei for 3D model interaction, featuring drag-and-drop, automatic camera positioning, environment controls, and a custom minimal UI",
        descriptionEs: "Aplicación React - TypeScript construida con React Three Fiber y Drei para interacción con modelos 3D, con drag-and-drop, automatización de cámara, controles de entorno y una UI minimalista personalizada",
        alt: "3d-model viewer website",
        altEs: "Website de visualizador de modelos 3D",
        technologies: ["React", "TypeScript", "R3F+Drei", "File API"],
        web: "https://tompsch.github.io/3d-model-viewer/",
        repository: "https://github.com/tompsch/3d-model-viewer",
    },
    {title: "music portfolio",
        titleEs: "portafolio musical",
        pic: musicPic,
        widePic: musicWide,
        fullTitle: "Musician online portfolio / ",
        fullTitleEs: "Portafolio musical online / ",
        description: "React web application featuring multilingual support, a custom-built video player, real form handling, and UI styling and animations built with plain CSS",
        descriptionEs: "Aplicación web en React con soporte multilenguaje, reproductor de video personalizado, manejo real de envío de formularios y animaciones e interfaz desarrolladas con CSS puro",
        alt: "Tom's music website",
        altEs: "Web de música de Tom",
        technologies: ["React","Context API","Custom Video Player","Form Handling"],
        web: "https://tompsch.com/",
        repository: "https://github.com/tompsch/tom-music",
    },
    {title: "resto website",
        titleEs: "restó web",
        pic: littlelemonPic,
        widePic: littlelemonWide,
        fullTitle: "Mediterranean restaurant website / ",
        fullTitleEs: "Restaurant mediterráneo / ",
        description: "React web application featuring API integration, client-side form validation with Formik and Yup, and real form submission handling",
        descriptionEs: "Aplicación web desarrollada con React con integración de APIs, formularios funcionales y validación del lado del cliente utilizando Formik y Yup",
        alt: "Little Lemon's website",
        altEs: "Wesite de Little Lemon",
        technologies: ["React", "API Integration", "Formik", "Yup validation"],
        web: "https://chicagolittlelemon.netlify.app",
        repository: "https://github.com/tompsch/little-lemon",
    },
    {title: "boutique salon",
    titleEs: "salón boutique",
    pic: salonPic,
    widePic: hairdayWide,
    fullTitle: "Boutique salon landing page / ",
    fullTitleEs: "Landing page de salón boutique / ",
    description: "Static HTML and CSS demo webpage built with embedded media and animations",
    descriptionEs: "Web demo estática creada con HTML y CSS, contenido embebido y animaciones",
    alt: "Hair Day Boutique Salon's website",
    altEs: "Página web del salón boutique Hair Day",
    technologies: ["HTML", "CSS", "Responsive Design", "UI Animations"],
    web:"https://tompsch.github.io/hairday/",
    repository: "https://github.com/tompsch/hair-day"
},
{title: "web portfolio",
    titleEs: "portafolio web",
    pic: webDev,
    widePic: webDevWide,
    fullTitle: "Web developer portfolio / ",
    fullTitleEs: "Portafolio de desarrollador web / ",
    description: "React - TypeScript web app featuring 3D animations, language and theme context implementation, client-side form validation, and styling and animations built with plain CSS",
    descriptionEs: "Aplicación web React - TypeScript que incorpora animaciones 3D, implementación de contexto para idioma y tema, validación de formularios del lado del cliente y estilos y animaciones realizados con CSS puro",
    alt: "TOMPSCH's web-dev website",
    altEs: "Página web del desarrollador web TOMPSCH",
    technologies: ["React", "TypeSript", "R3F", "Context API"],
    web:"https://tompsch.dev",
    repository: "https://github.com/tompsch/tom-web-dev"
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

export const TEXT = {
    nav: {
        home: ["/HOME", "/INICIO"],
        work: ["WORK", "TRABAJO"],
        about: ["BIO", "BIO"],
        contact: ["CONTACT","CONTACTO"]
    },
    hero: {
        one: ["I'm ", "Soy "],
        two: ["Tom", "Tom"],
        role: [`< react web developer />`, `< desarrollador web react />`],
    },
    philosophy: {
        title: ["Philosoph", "y", "Filosofí","a"],
        building: ["Building", "Interfaces"],
        elements: ["modern","responsive","performant","accesible","intuitive","modular","scalable","secure","reliable"],
        elementsEs: ["modernas","fluidas","eficientes","accesibles","intuitivas","modulares","robustas","seguras","fiables"],
        web: ["web experiences with ", "para experiencias web con "],
        code: ["clean code and", "código limpio y"],
        design: [" thoughtful design.", " diseño cuidado."],
        cta: ["start a project", "inicia un proyecto"]
    },
    about: {
        title: ["About m", "e", "Sobre m","í"],
        subtitle: ["front-end web developer with a strong background in music and education",
            "desarrollador web front-end con trayectoria en música y educación"],
        cta: ["learn more", "ver más"],
        react:["Front-end development with React","Desarrollo front-end con React"],
        reactTwo:[" — crafting responsive, clean, and performant UIs"," — creando UIs limpias, eficientes y responsivas"],
        python:["Expanding into full-stack","Creciendo hacia full-stack"],
        pythonTwo:[" with Python and Django"," con Python y Django"],
        gears:["Building real-world side projects","Creando proyectos paralelos del mundo real"],
        gearsTwo:[" to sharpen both ends of the stack"," para profundizar en ambos extremos del stack"],
        creativity:["Former teacher and musician","Experiencia como docente y músico"],
        creativityTwo:[" — bringing clarity, creativity, and a love for connecting the dots to every project"," — trayendo a cada proyecto claridad, creatividad y un gusto por unir sus piezas"],
    },
    projects: {
        title: ["Project", "s", "Proyecto","s"],
        cta: ["see more work", "ver más trabajos"]
    },
    footer: {
        role: [".web developer",".desarrollador web"]
    },
    workPage: {
        title: ["Portfoli", "o", "Portafoli","o"],
        cta: ["start your project", "inicia tu proyecto"]
    },
    aboutPage: {
        title: ["About m", "e", "Sobre m","í"],
        subtitle: ["Front-end web developer · Bilingual (EN/ES)", "Desarrollador web front-end · Bilingüe (EN/ES)"],
        cta: ["work with me", "trabajemos juntos"],
        one: ["With a background in Computer and Electronics Engineering, I've always been driven by a deep curiosity about how things work.",
            "Estudié Ingeniería Informática y Electrónica y siempre me ha impulsado una profunda curiosidad por entender cómo funcionan las cosas."],
        two: ["Before transitioning into web development, I worked as a musician and music teacher at schools and academies, which strengthened my communication and problem-solving skills, my patience and my passion for continuous learning.",
            "Antes de dedicarme al desarrollo web, trabajé como músico y profesor de música en escuelas y academias, experiencia que fortaleció mis habilidades de comunicación y resolución de problemas, así como mi paciencia y pasión por el aprendizaje continuo."],
        three: ["I specialize in building modern, responsive interfaces using",
            "Me especializo en la construcción de interfaces modernas y responsivas utilizando"],
        four: [" React, TypeScript, JavaScript, HTML, CSS, and Jest, ",
            " React, TypeScript, JavaScript, HTML, CSS y Jest "],
        five: ["and I'm currently expanding my knowledge in back-end development with",
            "y actualmente estoy ampliando mis conocimientos en desarrollo back-end con "],
        six: [" Python and Django ",
            " Python y Django "],
        seven: ["to move toward full-stack engineering.",
            "para avanzar hacia la ingeniería full-stack."],
        tech: ["TECH STACK", "TECNOLOGÍAS"],
    },
    contactPage: {
        title: ["Contac", "t", "Contact","o"],
        subtitle: ["Have a project in mind?", "¿Tienes un proyecto en mente?"],
        doubleSubtitle: ["I'd love to hear about it.", "Me encantaría conocerlo."],
        name: ["Name", "Nombre"],
        email: ["Email Address", "Correo electrónico"],
        message: ["Message", "Mensaje"],
        subError: ["Oops! Form submission failed. Try again!", "¡Oops! El envío falló. ¡Intente de nuevo!"],
        submit: ["Let's talk", "¡Hablemos!"],
        errors: {
            en:["Please enter a valid name","Maximum 30 characters", "Numbers are not allowed in this field", "Required", "Please enter a valid email", "Please enter at least 20 characters","1500 characters maximum. Need more space? Send me an email!"],
            es:["Por favor ingrese un nombre válido","Máximo 30 caracteres", "Números no admitidos en este campo", "Requerido", "Por favor ingrese un correo electrónico válido", "Por favor, al menos 20 caracteres","1500 caracteres máximo. ¿Necesitás más espacio? ¡Mándame un email!"]
        }
    },
    confirmationPage: {
        title: ["Contac", "t", "Contact","o"],
        subtitle: ["Thank you for your message!", "¡Gracias por tu mensaje!"],
        doubleSubtitle: ["I will get back to you shortly", "Me comunicaré en breve"],
        cta: ["back home", "volver al inicio"],
    }
}