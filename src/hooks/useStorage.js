import { nanoid } from 'nanoid'
import {create} from 'zustand'
import { createVillage } from '../world/village'

export const useStore = create(set => ({
  texture: 'dirt',
  cubes: createVillage(),
  addCube: (x, y, z) => {
    
    set(state => {
      console.log({
        process: "adding",
        cubes: state.cubes,
        position: [x,y,z]
      });
      return {
        cubes: [...state.cubes, {
          id: nanoid(),
          texture: state.texture,
          pos: [x, y, z]
        }]
      }
    })
  },
  removeCube: (id) => {
    set(state=>({
      cubes: state.cubes.filter(cube=>cube.id!==id)
    }))
  },
  setTexture: (texture) => {
    set(()=>({texture}));
  },
  saveWorld: () => {},
  resetWorld: () => {}
}))