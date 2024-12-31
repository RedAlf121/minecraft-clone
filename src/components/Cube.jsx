/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useBox } from "@react-three/cannon"
import * as textures from '../images/texture.js'
import { useStore } from "../hooks/useStorage.js";
import { useState } from "react";


export const Cube = ({id, position, texture})=>{
    const [cubeProps] = useBox(()=>({
        type: 'Static',
        position: position
    }));
    const [isHovered,setIsHovered] = useState(false);


    const removeCube = useStore(state=>state.removeCube);
    const addCube = useStore(state=>state.addCube);
    const handlingClickCubeRemove = (event)=>{
        event.stopPropagation();
        const [x,y,z] = Object.values(event.point).map((value)=>Math.ceil(value));
        if(event.button===0){
            removeCube(id);
        }else if(event.button===2){
            addCube(x,y,z)
        }
    }
    const activeTexture = textures[texture+'Texture'];
    return(
        <mesh
            onPointerMove={e=>{
                e.stopPropagation();
                setIsHovered(true)
                
            }} 
            onPointerOut={e=>{
                e.stopPropagation();
                setIsHovered(false);
            }}
            
            ref={cubeProps} onPointerDown={handlingClickCubeRemove}
        >
            <boxGeometry attach="geometry"></boxGeometry>
            <meshStandardMaterial 
                attach="material" 
                map={activeTexture}
                color={isHovered? "grey" : "white"} 
            />
        </mesh>
    )
}