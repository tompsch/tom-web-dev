import { useInView } from "react-intersection-observer"

export default function Line () {
    const [ ref, inView ] = useInView({
        threshold: 1,
    });
    return (
    <svg ref={ref} className={`line ${inView ? "inView" : "notInView"}`}>
        <line x1="0" x2="100%" strokeWidth="1px" y1="50%" y2="50%" />
    </svg>
)}