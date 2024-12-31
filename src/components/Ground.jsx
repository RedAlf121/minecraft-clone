/* eslint-disable react/no-unknown-property */
import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/texture";
import { useStore } from "../hooks/useStorage";

export const Ground = ({ bounds }) => {
    const [floor_props] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0]
    }));

    // Cambia la forma en que obtienes addCube
    const addCube = useStore(state => state.addCube);

    const handleClickGround = event => {
        event.stopPropagation();
        if(event.button===2){
            const [x, y, z] = Object.values(event.point).map(n => Math.ceil(n));
            addCube(x, y, z);
        }
    };

    const groundBounds = bounds;
    groundTexture.repeat.set(...groundBounds);

    return (
        <mesh ref={floor_props} onPointerDown={handleClickGround}>
            <planeGeometry attach="geometry" args={groundBounds}></planeGeometry>
            <meshStandardMaterial attach="material" map={groundTexture}></meshStandardMaterial>
        </mesh>
    );
}
