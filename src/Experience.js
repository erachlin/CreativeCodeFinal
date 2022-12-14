import { OrbitControls, useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import starVertexShader from "./shaders/starVertex.js";
import starFragmentShader from "./shaders/starFragment.js";
import sphereShader from "./shaders/sphereShader.js";
import sphereVertex from "./shaders/sphereVertex.js";
import artistFragment from "./shaders/artistFragment.js";
import artistVertex from "./shaders/artistVertex.js";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useControls } from "leva";
import { Vector3 } from "three";

// declaration for shader material for stars rendered in the scene
const StarMaterial = shaderMaterial({}, starVertexShader, starFragmentShader);

// declation for shader material for all audience locations on the globe
const GradientMaterial = shaderMaterial(
  { uTime: 0 },
  sphereVertex,
  sphereShader
);

// declaration for shader material for artist's location on the globe
const ArtistMaterial = shaderMaterial(
  { uTime: 0 },
  artistVertex,
  artistFragment
);

let boulder = converttoCartesian(40.00789901806392, -105.27000601728639);

let dehli = converttoCartesian(28.615205932605956, 77.27145735512924);

let accara = converttoCartesian(5.602651029866165, -0.18745686785037963);

let annapolis = converttoCartesian(38.98317612737906, -76.48688895532207);

let maywood = converttoCartesian(40.902693730363886, -74.06075771798712);

let sevilla = converttoCartesian(37.39062703943369, -5.983899466749108);

let rosario = converttoCartesian(-32.9602559294061, -60.69423846725374);

let chiba = converttoCartesian(35.22679040959066, 140.15967057878936);

let sydney = converttoCartesian(-33.86073177013934, 151.2181579146171);

let la = converttoCartesian(34.063403389282605, -118.24834611436715);

function converttoCartesian(lat, lng) {
  lat *= Math.PI / 180;
  lng *= Math.PI / 180;

  return {
    x: Math.cos(lat) * Math.sin(lng),
    y: Math.sin(lat),
    z: Math.cos(lat) * Math.cos(lng),
  };
}

// use cartesian coordinates to create arc line curve between two points
function getCurve(p1, p2) {
  let v1 = new THREE.Vector3(p1.x, p1.y, p1.z);
  let v2 = new THREE.Vector3(p2.x, p2.y, p2.z);
  let points = [];
  for (let i = 0; i < 20; i++) {
    let p = new THREE.Vector3().lerpVectors(v1, v2, i / 20);
    p.normalize();
    p.multiplyScalar(1 + 0.1 * Math.sin((Math.PI * i) / 20));
    points.push(p);
  }

  let path = new THREE.CatmullRomCurve3(points);
  return path;
}

// getting curves from artist's location to each audience location
let accaraCurve = getCurve(boulder, accara);
let dehliCurve = getCurve(boulder, dehli);
let annapolisCurve = getCurve(boulder, annapolis);
let maywoodCurve = getCurve(boulder, maywood);
let sevillaCurve = getCurve(boulder, sevilla);
let rosarioCurve = getCurve(boulder, rosario);
let chibaCurve = getCurve(boulder, chiba);
let sydneyCurve = getCurve(boulder, sydney);
let laCurve = getCurve(boulder, la);

// turn custom shader materials into JSX components
extend({ StarMaterial, GradientMaterial, ArtistMaterial });

// used for generating random star locations
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Experience() {
  // load in earth texture
  const props = useTexture({ map: "earthMap.jpg" });

  //offset texture to make lat/long to cartesian conversion work correctly
  props.map.wrapS = THREE.RepeatWrapping; // You do not need to set `.wrapT` in this case
  props.map.offset.x = 1.5708 / (2 * Math.PI);

  // each instance of an animated shader needs its own ref instance
  const ref1 = useRef();

  const ref2 = useRef();

  const ref3 = useRef();

  const ref4 = useRef();

  const ref5 = useRef();

  const ref6 = useRef();

  const ref7 = useRef();

  const ref8 = useRef();

  const ref9 = useRef();

  const ref10 = useRef();

  // related to above, each ref instance gets current time added to it
  useFrame(({ clock }) => (ref1.current.uTime = clock.getElapsedTime()));

  useFrame(({ clock }) => (ref2.current.uTime = clock.getElapsedTime()));

  useFrame(({ clock }) => (ref3.current.uTime = clock.getElapsedTime()));

  useFrame(({ clock }) => (ref4.current.uTime = clock.getElapsedTime()));

  useFrame(({ clock }) => (ref5.current.uTime = clock.getElapsedTime()));

  useFrame(({ clock }) => (ref6.current.uTime = clock.getElapsedTime()));

  useFrame(({ clock }) => (ref7.current.uTime = clock.getElapsedTime()));

  useFrame(({ clock }) => (ref8.current.uTime = clock.getElapsedTime()));

  useFrame(({ clock }) => (ref9.current.uTime = clock.getElapsedTime()));

  useFrame(({ clock }) => (ref10.current.uTime = clock.getElapsedTime()));

  return (
    <>
      {/* allows for mouse controls of scene */}
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight />
      {/* earth mesh */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial {...props} />
      </mesh>

      <mesh position={[accara.x, accara.y, accara.z]}>
        <sphereGeometry args={[0.015, 8, 8]} rotateX={[3]} />
        {/* getting extended shader material JSX */}
        <gradientMaterial ref={ref1} />
      </mesh>
      <mesh
        position={[boulder.x, boulder.y, boulder.z]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <sphereGeometry args={[0.03, 8, 8]} />
        <artistMaterial ref={ref2} />
      </mesh>
      <mesh position={[dehli.x, dehli.y, dehli.z]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <gradientMaterial ref={ref3} />
      </mesh>
      <mesh position={[annapolis.x, annapolis.y, annapolis.z]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <gradientMaterial ref={ref4} />
      </mesh>
      <mesh position={[maywood.x, maywood.y, maywood.z]}>
        <sphereGeometry args={[0.0025, 8, 8]} />
        <gradientMaterial ref={ref5} />
      </mesh>
      <mesh position={[sevilla.x, sevilla.y, sevilla.z]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <gradientMaterial ref={ref6} />
      </mesh>
      <mesh position={[rosario.x, rosario.y, rosario.z]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <gradientMaterial ref={ref7} />
      </mesh>
      <mesh position={[chiba.x, chiba.y, chiba.z]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <gradientMaterial ref={ref8} />
      </mesh>
      <mesh position={[sydney.x, sydney.y, sydney.z]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <gradientMaterial ref={ref9} />
      </mesh>
      <mesh position={[la.x, la.y, la.z]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <gradientMaterial ref={ref10} />
      </mesh>

      {/* using tube geometries for arc lines between artist's location and audience locations */}
      <mesh>
        <tubeGeometry args={[accaraCurve, 20, 0.002, 8, false]} />
        <meshStandardMaterial
          roughness={0.8}
          metalness={0.2}
          color={"#d4c415"}
          emmisive={"#ffffff"}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[dehliCurve, 20, 0.002, 8, false]} />
        <meshStandardMaterial
          roughness={0.8}
          metalness={0.2}
          color={"#d4c415"}
          emmisive={"#ffffff"}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[annapolisCurve, 20, 0.0015, 8, false]} />
        <meshStandardMaterial
          roughness={0.8}
          metalness={0.2}
          color={"#d4c415"}
          emmisive={"#ffffff"}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[maywoodCurve, 20, 0.0015, 8, false]} />
        <meshStandardMaterial
          roughness={0.8}
          metalness={0.2}
          color={"#d4c415"}
          emmisive={"#ffffff"}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[sevillaCurve, 20, 0.002, 8, false]} />
        <meshStandardMaterial
          roughness={0.8}
          metalness={0.2}
          color={"#d4c415"}
          emmisive={"#ffffff"}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[rosarioCurve, 20, 0.002, 8, false]} />
        <meshStandardMaterial
          roughness={0.8}
          metalness={0.2}
          color={"#d4c415"}
          emmisive={"#ffffff"}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[chibaCurve, 20, 0.002, 8, false]} />
        <meshStandardMaterial
          roughness={0.8}
          metalness={0.2}
          color={"#d4c415"}
          emmisive={"#ffffff"}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[sydneyCurve, 20, 0.002, 8, false]} />
        <meshStandardMaterial
          roughness={0.8}
          metalness={0.2}
          color={"#d4c415"}
          emmisive={"#ffffff"}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[laCurve, 20, 0.002, 8, false]} />
        <meshStandardMaterial
          roughness={0.8}
          metalness={0.2}
          color={"#d4c415"}
          emmisive={"#ffffff"}
        />
      </mesh>

      {/* generate 400 spheres in random locations with star shader material  */}
      {[...Array(400)].map(() => (
        <mesh
          position={[
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
          ]}
          rotation={[
            getRandom(0, Math.PI * 2),
            getRandom(0, Math.PI * 2),
            getRandom(0, Math.PI * 2),
          ]}
        >
          <sphereGeometry args={[0.1, 32, 32]} />
          <starMaterial />
        </mesh>
      ))}
    </>
  );
}
