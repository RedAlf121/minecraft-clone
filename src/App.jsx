/* eslint-disable react/no-unknown-property */
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {Camera} from "./components/Camera";
import {World} from "./components/World";
import {TextureSelector} from "./components/TextureSelector";

export const App = () => {
    return (
        <>
            <Canvas>
                <Sky sunPosition={[100, 180, 100]}></Sky>
                <ambientLight intensity={0.8}></ambientLight>
                <Camera></Camera>
                <World />
            </Canvas>
            <TextureSelector></TextureSelector>
            <div className="pointer">+</div>
        </>
    );
}
