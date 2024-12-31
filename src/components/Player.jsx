import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import useKeyboard from "../hooks/useKeyboard";

const PLAYER_SPEED = 5;
const PLAYER_JUMP_SPEED = 3;
const EPSILON = 0.0005;

const useProps = () => {
    const { moveforward, movebackward, moveleft, moverright, jump } = useKeyboard();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position: [0, 5, 0],
        type: "Dynamic",
    }));

    const speed = useRef([0, 0, 0]);
    const position = useRef([0, 0, 0]);
    return {
        moveforward,
        movebackward,
        moveleft,
        moverright,
        jump,
        speed,
        position,
        ref,
        api
    };
};

const getAxis = (axisA, axisB) => {
    if (axisA) return -1;
    if (axisB) return 1;
    return 0;
};

const useSuscribeToCamera = (mapProps) => {
    useEffect(() => {
        mapProps.api.position.subscribe((p) => {
            mapProps.position.current = p;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapProps.api.position]);

    useEffect(() => {
        mapProps.api.velocity.subscribe((v) => {
            mapProps.speed.current = v;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapProps.api.velocity]);
};

const useGameLoop = (mapProps, bounds) => {
    useFrame(() => {
        mapProps.camera.position.copy(
            new Vector3(...mapProps.position.current)
        );

        if (!inBounds(mapProps.position.current, bounds)) {
            // Opcional: También puedes mover al jugador de vuelta a una posición válida
            mapProps.api.position.set(
                Math.max(
                    -bounds[0] / 2,
                    Math.min(bounds[0] / 2, mapProps.position.current[0])
                ),
                mapProps.position.current[1],
                Math.max(
                    -bounds[1] / 2,
                    Math.min(bounds[1] / 2, mapProps.position.current[2])
                )
            );
        }
        handleMovement(mapProps);
        handleJump(mapProps);
    });
};

const isInFloor = (mapProps) => {
    return Math.abs(mapProps.speed.current[1]) <= EPSILON;
};

const handleJump = (mapProps) => {
    if (mapProps.jump && isInFloor(mapProps)) {
        mapProps.api.velocity.set(
            mapProps.speed.current[0],
            PLAYER_JUMP_SPEED,
            mapProps.speed.current[2],
        );
    }
};

const handleMovement = (mapProps) => {
    const direction = new Vector3(
        getAxis(mapProps.moveleft, mapProps.moverright),
        0,
        getAxis(mapProps.moveforward, mapProps.movebackward)
    );
    direction
        .normalize()
        .multiplyScalar(PLAYER_SPEED)
        .applyEuler(mapProps.camera.rotation);
    if (direction.length() > 0) {
        mapProps.api.velocity.set(
            direction.x,
            mapProps.speed.current[1],
            direction.z
        );
    } else {
        mapProps.api.velocity.set(0, mapProps.speed.current[1], 0);
    }
};

const inBounds = (position, bounds) => {
    const [length, width] = bounds;
    const halfLength = length / 2;
    const halfWidth = width / 2;

    return (
        position[0] >= -halfLength &&
        position[0] <= halfLength &&
        position[2] >= -halfWidth &&
        position[2] <= halfWidth
    );
};

// eslint-disable-next-line react/prop-types
export const Player = ({ bounds, camera }) => {
    const mapProps = useProps();
    mapProps.camera = camera;
    useSuscribeToCamera(mapProps);

    useGameLoop(mapProps, bounds);

    return <mesh ref={mapProps.ref}></mesh>;
};
