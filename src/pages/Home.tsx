import Navbar from "../components/Navbar"
import Hero from "../sections/Hero"
import Philosophy from "../sections/Philosophy"
import Projects from "../sections/Projects"
import About from "../sections/About"
import Footer from "../sections/Footer"

interface HomeProps {
    anchors: {[key:string]: React.RefObject<HTMLElement | null>}
}

export default function Home ({anchors}: HomeProps) {
    return (
        <>
            <Navbar anchors={anchors} />
            <Hero />
            <Philosophy />
            <Projects ref={anchors.work}/>
            <About ref={anchors.about}/>
            <Footer anchors={anchors} />
        </>
    )
}