import { useEffect, useState } from "react";

const KEYMAP = {
   KeyW : 'moveforward',
   KeyS : 'movebackward',
   KeyA : 'moveleft',
   KeyD : 'moverright',
   Space : 'jump',
   Digit1 : 'grass',
   Digit2 : 'glass',
   Digit3 : 'dirt',
   Digit4 : 'wood',
   Digit5 : 'log'
}

export default function useKeyboard(){
    const [actions,setActions] = useState({
        moveforward: false,
        movebackward: false,
        moveleft: false,
        moverright: false,
        jump: false,
        grass:false,
        glass:false,
        dirt:false,
        wood:false,
        log:false
    })

    useEffect(()=>{
        const handleKey = (e)=>{
            const action = KEYMAP[e.code]
            if(action){
                setActions((previous)=>({
                    ...previous,
                    [action]: e.type==='keydown'
                }))
            }
        }
        document.addEventListener('keydown',handleKey)
        document.addEventListener('keyup',handleKey)
        return ()=>{
            document.removeEventListener('keydown',handleKey)
            document.removeEventListener('keyup',handleKey)
        }
    },[])
    return actions
}