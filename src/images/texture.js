import { grassImg, glassImg, dirtImg, woodImg, logImg } from "./images";
import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

const groundTexture = new TextureLoader().load(grassImg)
const grassTexture = new TextureLoader().load(grassImg)
const glassTexture = new TextureLoader().load(glassImg)
const dirtTexture = new TextureLoader().load(dirtImg)
const woodTexture = new TextureLoader().load(woodImg)
const logTexture = new TextureLoader().load(logImg)
const textures = [groundTexture,grassTexture,glassTexture,dirtTexture,woodTexture,logTexture]
textures.forEach((value)=>{
    value.wrapS = value.wrapT = RepeatWrapping
    value.magFilter = NearestFilter    
})

export {groundTexture,grassTexture,glassTexture,dirtTexture,woodTexture,logTexture}