import { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { Font } from "three/examples/jsm/Addons.js";
import { ShapeGeometry } from "three";
import * as THREE from "three";
import styles from "../sections/Hero.module.css"

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
  texture: THREE.Texture;
}

function ParticleSystem({ font, texture }: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  const geometryCopyRef = useRef<THREE.BufferGeometry | null>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const mouse = useRef<THREE.Vector2>(new THREE.Vector2(-200, 200));
  const isDown = useRef<boolean>(false);
  const currentPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const raycaster = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const colorChange = useRef<THREE.Color>(new THREE.Color());
  const easeRef = useRef<number>(0.05);

  const { camera, gl, size } = useThree();

  // acá agrego el valor dinámico de size (1. lo agregué al useThree, 2. lo calculo con useMemo )
  const textSize = useMemo((()=>{
    if (size.width < 480) return 8;
    if (size.width < 768) return 10;
    if (size.width < 1024) return 13;
    return 16;
  }),[size.width])
  // hasta acá lo nuevo

  const data: ParticleData = {
    text: "tom psch",
    amount: 1500,
    particleSize: 1,
    particleColor: 0xffffff,
    textSize, // before --> textSize: 16
    area: 230, // before 250
  };

const geometry = useMemo(() => {
    const thePoints: THREE.Vector3[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    const color = new THREE.Color();

    const lines = data.text.split('\n');
    let offsetY = 0;

    for (const line of lines) {
        const shapes = font.generateShapes(line, data.textSize);
        
        const lineGeo = new ShapeGeometry(shapes);
        lineGeo.computeBoundingBox();
        const lineWidth = lineGeo.boundingBox!.max.x - lineGeo.boundingBox!.min.x;
        const xOffset = -lineWidth / 2;

        let holeShapes: THREE.Shape[] = [];
        for (let q = 0; q < shapes.length; q++) {
            const shape = shapes[q];
            if (shape.holes && shape.holes.length > 0) {
                for (let j = 0; j < shape.holes.length; j++) {
                    holeShapes.push(shape.holes[j] as THREE.Shape);
                }
            }
        }
        shapes.push(...holeShapes);

        for (let x = 0; x < shapes.length; x++) {
            const shape = shapes[x];
            const amountPoints = shape.type === "Path" ? data.amount / 2 : data.amount;
            const points = shape.getSpacedPoints(amountPoints);

            points.forEach((element) => {
                thePoints.push(new THREE.Vector3(element.x + xOffset, element.y - offsetY, 0));
                colors.push(color.r, color.g, color.b);
                sizes.push(1);
            });
        }

        offsetY += data.textSize * 1.2;
    }

    const bufferGeo = new THREE.BufferGeometry().setFromPoints(thePoints);
    bufferGeo.computeBoundingBox();
    const centerY = -0.1 * (bufferGeo.boundingBox!.max.y + bufferGeo.boundingBox!.min.y);
    bufferGeo.translate(0, centerY, 0);
    // bufferGeo.center();
    bufferGeo.setAttribute("customColor", new THREE.Float32BufferAttribute(colors, 3));
    bufferGeo.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

    return bufferGeo;
}, [font, textSize]);
  useEffect(() => {
    geometryCopyRef.current = new THREE.BufferGeometry();
    geometryCopyRef.current.copy(geometry);
  }, [geometry]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xffffff) },
          pointTexture: { value: texture },
        },
        vertexShader,
        fragmentShader,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      }),
    [texture]
  );

  const visibleHeight = (depth: number): number => {
    let d = depth;
    const cam = camera as THREE.PerspectiveCamera;
    const cameraOffset = cam.position.z;
    if (d < cameraOffset) d -= cameraOffset;
    else d += cameraOffset;
    const vFOV = (cam.fov * Math.PI) / 180;
    return 2 * Math.tan(vFOV / 2) * Math.abs(d);
  };

  const visibleWidth = (depth: number): number =>
    visibleHeight(depth) * (camera as THREE.PerspectiveCamera).aspect;

  const dist = (x1: number, y1: number, x2: number, y2: number): number =>
    Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseDown = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      const vector = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      currentPos.current = camera.position.clone().add(dir.multiplyScalar(distance));

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

  useFrame(() => {
    if (!meshRef.current || !planeRef.current || !geometryCopyRef.current) return;

    const time = ((0.001 * performance.now()) % 12) / 12;
    const zigzagTime = (1 + Math.sin(time * 2 * Math.PI)) / 6;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObject(planeRef.current);

    if (intersects.length > 0) {
      const pos = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const copy = geometryCopyRef.current.attributes.position as THREE.BufferAttribute;
      const coulors = meshRef.current.geometry.attributes.customColor as THREE.BufferAttribute;
      const size = meshRef.current.geometry.attributes.size as THREE.BufferAttribute;

      const mx = intersects[0].point.x;
      const my = intersects[0].point.y;
      const mz = intersects[0].point.z;

      for (let i = 0, l = pos.count; i < l; i++) {
        const initX = copy.getX(i);
        const initY = copy.getY(i);
        const initZ = copy.getZ(i);

        let px = pos.getX(i);
        let py = pos.getY(i);
        let pz = pos.getZ(i);

        colorChange.current.setHSL(0.5, 1, 1);
        coulors.setXYZ(i, colorChange.current.r, colorChange.current.g, colorChange.current.b);
        coulors.needsUpdate = true;

        size.array[i] = data.particleSize;
        size.needsUpdate = true;

        const dx = mx - px;
        const dy = my - py;
        const mouseDistance = dist(mx, my, px, py);
        const d = dx * dx + dy * dy;
        const f = -data.area / d;

        if (isDown.current) {
          const t = Math.atan2(dy, dx);
          px -= f * Math.cos(t);
          py -= f * Math.sin(t);

          colorChange.current.setHSL(0.5 + zigzagTime, 1.0, 0.5);
          coulors.setXYZ(i, colorChange.current.r, colorChange.current.g, colorChange.current.b);
          coulors.needsUpdate = true;

          if (px > initX + 70 || px < initX - 70 || py > initY + 70 || py < initY - 70) {
            colorChange.current.setHSL(0.15, 1.0, 0.5);
            coulors.setXYZ(i, colorChange.current.r, colorChange.current.g, colorChange.current.b);
            coulors.needsUpdate = true;
          }
        } else {
          if (mouseDistance < data.area) {
            if (i % 5 === 0) {
              const t = Math.atan2(dy, dx);
              px -= 0.03 * Math.cos(t);
              py -= 0.03 * Math.sin(t);

              colorChange.current.setHSL(0.15, 1.0, 0.5);
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
              colorChange.current.setHSL(0.15, 1.0, 0.5);
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
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const fontLoader = new FontLoader();
    fontLoader.load(
      "https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json",
      (f) => setFont(f)
    );

    const texLoader = new THREE.TextureLoader();
    texLoader.load(
      "https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png",
      (t) => setTexture(t)
    );
  }, []);
  return (
    <div id={styles.three} style={{ width: "100vw", height: "80vh", background: "#0b0e14"}} >
        <Canvas
            camera={{ fov: 65, position: [0, 0, 100], near: 1, far: 10000 }}
            gl={{ antialias: true }}
            onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace;
            }}
        >
            {font && texture && <ParticleSystem font={font} texture={texture} />}
        </Canvas>
    </div>
    )
}