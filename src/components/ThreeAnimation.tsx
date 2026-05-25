import { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js"
import { ShapeGeometry, Texture, Raycaster, Vector2, Points, BufferGeometry, Mesh, Color, Vector3, Shape, Float32BufferAttribute, ShaderMaterial, AdditiveBlending, NormalBlending, PerspectiveCamera, BufferAttribute, TextureLoader, SRGBColorSpace } from "three";
import styles from "../sections/Hero.module.css"
import { useTheme } from "../context/ThemeContext"

const isMobile = 'ontouchstart' in window; // linea que agrego para saber si es movil

const vertexShader = `
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;
  void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 color;
  uniform sampler2D pointTexture;
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 1.0);
    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
    if (gl_FragColor.a < 0.05) discard;
  }
`;

interface ParticleData {
  text: string;
  amount: number;
  particleSize: number;
  particleColor: number;
  textSize: number;
  area: number;
}

interface ParticleSystemProps {
  font: Font;
  texture: Texture;
}

function ParticleSystem({ font, texture }: ParticleSystemProps) {
    const { theme } = useTheme();

    const [prefersReducedMotion, setPrefersReducedMotion] = useState(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    useEffect(()=>{
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleChanges = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches)
      }
      motionQuery.addEventListener("change",handleChanges)
      return ()=>motionQuery.removeEventListener("change", handleChanges);
    },[])

    const meshRef = useRef<Points>(null);
    const geometryCopyRef = useRef<BufferGeometry | null>(null);
    const planeRef = useRef<Mesh>(null);
    const mouse = useRef<Vector2>(new Vector2(-200, 200));
    const isDown = useRef<boolean>(false);
    // const currentPos = useRef<THREE.Vector3>(new THREE.Vector3());
    const raycaster = useRef<Raycaster>(new Raycaster());
    const colorChange = useRef<Color>(new Color());
    const easeRef = useRef<number>(0.05);

    const { camera, size, gl } = useThree(); //antes tambien "gl"

    const animateStateRef = useRef<'pressing_ltr' | 'waitingR' | 'waitingL' | 'hovering_rtl'>('pressing_ltr'); // guardado de interracción en movil
    // tiempos para animar en movil
    // const stateStartRef = useRef<number>(performance.now());
    const elapsedRef = useRef(0);
  // acá agrego el valor dinámico de size (1. lo agregué al useThree, 2. lo calculo con useMemo )
  const textSize = useMemo((()=>{
    if (size.width < 390) return 8;
    if (size.width < 834) return 10;
    if (size.width < 1024) return 13;
    return 16;
  }),[size.width])
  // hasta acá lo nuevo
  // acá abajo agrego el valor dinámico de area en función a textSize
    const area = useMemo(() => {
        return textSize * 15;   // para que me dé 250 de area con textSize max.
    }, [textSize]);
  // hasta acá lo nuevo

  const data: ParticleData = {
    text: "tom psch",
    amount: 1500,
    particleSize: 1,
    particleColor: 0xffffff,
    textSize, // before --> textSize: 16
    area, // before 250
  };
  const areaRef = useRef<number>(area);

  useEffect(() => {
        // areaRef.current = area;
        areaRef.current = prefersReducedMotion ? 0 : area;

    }, [area, prefersReducedMotion]);

const geometry = useMemo(() => {
    const thePoints: Vector3[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    const color = new Color();
    theme === "dark" ? color.setHSL(0.142, 0.84, 0.64) : color.setRGB(0.03,0.14,0.20);

    const lines = data.text.split('\n');
    let offsetY = 0;

    for (const line of lines) {
        const shapes = font.generateShapes(line, data.textSize);
        const lineGeo = new ShapeGeometry(shapes);
        lineGeo.computeBoundingBox();
        const lineWidth = lineGeo.boundingBox!.max.x - lineGeo.boundingBox!.min.x;
        const xOffset = -lineWidth / 2;

        let holeShapes: Shape[] = [];
        for (let q = 0; q < shapes.length; q++) {
            const shape = shapes[q];
            if (shape.holes && shape.holes.length > 0) {
                for (let j = 0; j < shape.holes.length; j++) {
                    holeShapes.push(shape.holes[j] as Shape);
                }
            }
        }
        shapes.push(...holeShapes);

        for (let x = 0; x < shapes.length; x++) {
            const shape = shapes[x];
            const amountPoints = shape.type === "Path" ? data.amount / 2 : data.amount;
            const points = shape.getSpacedPoints(amountPoints);

            points.forEach((element) => {
                thePoints.push(new Vector3(element.x + xOffset, element.y - offsetY, 0));
                colors.push(color.r, color.g, color.b);
                sizes.push(1);
            });
        }

        offsetY += data.textSize * 1.2;
    }

    const bufferGeo = new BufferGeometry().setFromPoints(thePoints);
    bufferGeo.computeBoundingBox();
    const centerY = -0.1 * (bufferGeo.boundingBox!.max.y + bufferGeo.boundingBox!.min.y);
    bufferGeo.translate(0, centerY, 0);
    // bufferGeo.center();
    bufferGeo.setAttribute("customColor", new Float32BufferAttribute(colors, 3));
    bufferGeo.setAttribute("size", new Float32BufferAttribute(sizes, 1));

    return bufferGeo;
}, [font, textSize, theme]);
  useEffect(() => {
    geometryCopyRef.current = new BufferGeometry();
    geometryCopyRef.current.copy(geometry);
  }, [geometry]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          color: { value: new Color(0xffffff) },
          pointTexture: { value: texture },
        },
        vertexShader,
        fragmentShader,
        blending: theme === "dark" ? AdditiveBlending : NormalBlending,
        depthTest: false,
        transparent: true,
      }),
    [texture, theme]
  );

  const visibleHeight = (depth: number): number => {
    let d = depth;
    const cam = camera as PerspectiveCamera;
    const cameraOffset = cam.position.z;
    if (d < cameraOffset) d -= cameraOffset;
    else d += cameraOffset;
    const vFOV = (cam.fov * Math.PI) / 180;
    return 2 * Math.tan(vFOV / 2) * Math.abs(d);
  };

  const visibleWidth = (depth: number): number =>
    visibleHeight(depth) * (camera as PerspectiveCamera).aspect;

  const dist = (x1: number, y1: number, x2: number, y2: number): number =>
    Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

  useEffect(() => {

      const onMouseMove = (e: MouseEvent) => {
        const rect = gl.domElement.getBoundingClientRect(); // agrego esto para filtrar las interacciones fuera del canvas
        const isInsideCanvas =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;
            if (!isInsideCanvas) return; //hasta acá

      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    //   mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      // mouse.current.y = -(e.clientY / (rect.top + rect.bottom)) * 2 + 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    //   console.log(window.innerHeight)
    //   console.log(rect.top + rect.bottom)
    };

    const onMouseDown = (e: MouseEvent) => {
        const rect = gl.domElement.getBoundingClientRect(); // agrego esto para filtrar las interacciones fuera del canvas
        const isInsideCanvas =              //igual desde acá
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

        if (!isInsideCanvas) return;        //hasta acá

        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        // mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        // mouse.current.y = -(e.clientY / (rect.top + rect.bottom)) * 2 + 1;
        mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

        // const vector = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5);
        // vector.unproject(camera);
        // const dir = vector.sub(camera.position).normalize();
        // const distance = -camera.position.z / dir.z;
        // currentPos.current = camera.position.clone().add(dir.multiplyScalar(distance));

        isDown.current = true;
        easeRef.current = 0.01;
    };

    const onMouseUp = () => {
      isDown.current = false;
      easeRef.current = 0.05;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [camera]);

 useEffect(() => {
  const handleScroll = () => {
      if (!isMobile) return;
      mouse.current.x = -200;
      mouse.current.y = 200;
      isDown.current = false;
      areaRef.current = 0;
      animateStateRef.current = 'waitingL';
      elapsedRef.current = 3;
    };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  useFrame((_,delta) => {
    const safeDelta = Math.min(delta, 0.033);
    if (!meshRef.current || !planeRef.current || !geometryCopyRef.current) return;

    if (isMobile) {             // esto es para simular una interacción en movil
      if (prefersReducedMotion) return;

        const yOffset = textSize * 0.005; //calculo el offset de Y en función al textSize
        elapsedRef.current += safeDelta;
        const elapsed = elapsedRef.current;
        switch (animateStateRef.current) {
            case 'pressing_ltr': {
                const progress = elapsed / 1; // 0 a 1 en 2 segundos (antes 4)
                mouse.current.x = -1 + progress * 2; // de -1 a 1
                mouse.current.y = yOffset;
                isDown.current = true;

                if (elapsed > 1) {
                    animateStateRef.current = 'waitingR';
                    elapsedRef.current = 0;
                }
                break;
            }

            case 'waitingR': {
                areaRef.current = 0;    //agregado para salir de zona de interacción

                if (elapsed > 4) {
                    areaRef.current = 20;    //hard-code area para que "rompa" el texto completo cuando sale
                    animateStateRef.current = 'hovering_rtl';
                    elapsedRef.current = 0;
                    isDown.current = false;
                }
                break;
            }

            case 'hovering_rtl': {
                const progress = elapsed / 2.5; // 0 a 1 en 2.5 segundos
                mouse.current.x = 1 - progress * 2; // de 1 a -1
                mouse.current.y = yOffset;
                isDown.current = false;

                if (elapsed > 2.5) {
                    animateStateRef.current = 'waitingL';
                    elapsedRef.current = 0;
                }
                break;
            }
            case 'waitingL': {
                areaRef.current = 0;    //agregado para salir de zona de interacción

                if (elapsed > 6) {
                    areaRef.current = area;    //agregado para entran en zona de interacción
                    animateStateRef.current = 'pressing_ltr';
                    elapsedRef.current = 0;
                }
                break;
            }
    }
    }
    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObject(planeRef.current);

    if (intersects.length > 0) {
      const pos = meshRef.current.geometry.attributes.position as BufferAttribute;
      const copy = geometryCopyRef.current.attributes.position as BufferAttribute;
      const coulors = meshRef.current.geometry.attributes.customColor as BufferAttribute;
      const size = meshRef.current.geometry.attributes.size as BufferAttribute;

      const mx = intersects[0].point.x;
      const my = intersects[0].point.y;
    //   const mz = intersects[0].point.z;

      for (let i = 0, l = pos.count; i < l; i++) {
        const initX = copy.getX(i);
        const initY = copy.getY(i);
        const initZ = copy.getZ(i);

        let px = pos.getX(i);
        let py = pos.getY(i);
        let pz = pos.getZ(i);

         //antes setHSL(0.5, 1, 1)                          ORIGINAL
         // colorChange.current.setHSL(0.142, 0.7, 0.75);   SEGUNDA BUENA OPCION
        theme==="dark" ? colorChange.current.setHSL(0.142, 0.84, 0.64) : // COLOR POR ENCIMA UNA VEZ QUE ACTIVO MOUSE
            colorChange.current.setRGB(0.03,0.14,0.20)

        coulors.setXYZ(i, colorChange.current.r, colorChange.current.g, colorChange.current.b);
        coulors.needsUpdate = true;

        size.array[i] = data.particleSize;
        size.needsUpdate = true;

        const dx = mx - px;
        const dy = my - py;
        const mouseDistance = dist(mx, my, px, py);
        const d = dx * dx + dy * dy;
        const f = -areaRef.current / d;           // antes  const f = -data.area / d;

        if (isDown.current) {
          const t = Math.atan2(dy, dx);
          px -= f * Math.cos(t);
          py -= f * Math.sin(t);

          //colorChange.current.setHSL(0.5 + zigzagTime, 1.0, 0.5); ORIGINAL
          theme==="dark" ? colorChange.current.setHSL(0.142, 0.84, 0.64) :
            colorChange.current.setRGB(0.03,0.14,0.20)

          coulors.setXYZ(i, colorChange.current.r, colorChange.current.g, colorChange.current.b);
          coulors.needsUpdate = true;

          if (px > initX + 70 || px < initX - 70 || py > initY + 70 || py < initY - 70) {

            //colorChange.current.setHSL(0.15, 1.0, 0.5);    ORIGINAL
            theme==="dark" ? colorChange.current.setHSL(0.578, 0.86, 0.96) :
                colorChange.current.setRGB(0.9, 0.4, 0.1)

            coulors.setXYZ(i, colorChange.current.r, colorChange.current.g, colorChange.current.b);
            coulors.needsUpdate = true;
          }
        } else {
          if (mouseDistance < areaRef.current) {
            if (i % 5 === 0) {
              const t = Math.atan2(dy, dx);
              px -= 0.03 * Math.cos(t);
              py -= 0.03 * Math.sin(t);

              theme==="dark" ? colorChange.current.setHSL(0.15, 1.0, 0.5) : // COLOR DEL FONDO
                colorChange.current.setRGB(0.2, 0.5, 0.7)

              coulors.setXYZ(i, colorChange.current.r, colorChange.current.g, colorChange.current.b);
              coulors.needsUpdate = true;
              size.array[i] = data.particleSize / 1.2;
              size.needsUpdate = true;
            } else {
              const t = Math.atan2(dy, dx);
              px += f * Math.cos(t);
              py += f * Math.sin(t);

              pos.setXYZ(i, px, py, pz);
              pos.needsUpdate = true;
              size.array[i] = data.particleSize * 1.3;
              size.needsUpdate = true;
            }

            if (px > initX + 10 || px < initX - 10 || py > initY + 10 || py < initY - 10) {
              theme==="dark" ? colorChange.current.setHSL(0.15, 1.0, 0.5) : // COLOR DEL CIRCULO
                colorChange.current.setRGB(0.2, 0.5, 0.7)

              coulors.setXYZ(i, colorChange.current.r, colorChange.current.g, colorChange.current.b);
              coulors.needsUpdate = true;
              size.array[i] = data.particleSize / 1.8;
              size.needsUpdate = true;
            }
          }
        }

        px += (initX - px) * easeRef.current;
        py += (initY - py) * easeRef.current;
        pz += (initZ - pz) * easeRef.current;

        pos.setXYZ(i, px, py, pz);
        pos.needsUpdate = true;
      }
    }
  });

  const h = visibleHeight(100);
  const w = visibleWidth(100);

  return (
    <>
      <mesh ref={planeRef} visible={false}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial color={0x00ff00} transparent />
      </mesh>
      <points ref={meshRef} geometry={geometry} material={material} />
    </>
  );
}

export default function ThreeAnimation () {
  const [font, setFont] = useState<Font | null>(null);
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    const fontLoader = new FontLoader();
    fontLoader.load(
      "/font.json",
      (f) => setFont(f)
    );

    const texLoader = new TextureLoader();
    texLoader.load(
      "/particle.png",
      (t) => setTexture(t)
    );
  }, []);
  return (
    <div id={styles.three} >
        <Canvas
            camera={{ fov: 65, position: [0, 0, 100], near: 1, far: 10000 }}
            gl={{ antialias: true }}
            onCreated={({ gl }) => {
            gl.outputColorSpace = SRGBColorSpace;
            }}
        >
            {font && texture && <ParticleSystem font={font} texture={texture} />}
        </Canvas>
    </div>
    )
}