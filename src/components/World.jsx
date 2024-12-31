import { Physics } from "@react-three/cannon";
import {Cubes} from "./Cubes";
import {Ground} from "./Ground";
import {Player} from "./Player";
import { useThree } from "@react-three/fiber";

export const World = () => {
    const bounds = [1000, 1000];
    const {camera} = useThree();
    return (
        <>
            <Physics>
                <Ground bounds={bounds}></Ground>
                <Player camera={camera} bounds={bounds}></Player>
                <Cubes></Cubes>
            </Physics>
        </>
    );
}
