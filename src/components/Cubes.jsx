import { useStore } from "../hooks/useStorage.js";
import {Cube} from "./Cube.jsx";

export const Cubes = () => {
    const cubes = useStore(state => state.cubes);
    
    return (
        <>
            {cubes.map(({ id, pos, texture }) => (
                <Cube
                    key={id}
                    id={id}
                    position={pos}
                    texture={texture}
                />
            ))}
        </>
    );
}
