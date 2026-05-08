import Hero from "../sections/Hero"
import Philosophy from "../sections/Philosophy"
import Projects from "../sections/Projects"
import About from "../sections/About"

interface HomeProps {
    anchors: {[key:string]: React.RefObject<HTMLElement | null>}
}

export default function Home ({anchors}: HomeProps) {
    return (
        <>
            <Hero />
            <Philosophy />
            <About ref={anchors.about}/>
            <Projects ref={anchors.work}/>
        </>
    )
}