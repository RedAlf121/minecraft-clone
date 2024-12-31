import { useEffect } from "react";
import { useStore } from "../hooks/useStorage";
import useKeyboard from "../hooks/useKeyboard";
import * as images from "../images/images.js";

export const TextureSelector = () => {
    const texture = useStore((state) => state.texture);
    const setTexture = useStore((state) => state.setTexture);
    const { grass, glass, dirt, wood, log } = useKeyboard();
    const textureOrder = ["grass", "glass", "dirt", "wood", "log"];
    
    useEffect(() => {
        const options = {
            grass,
            glass,
            dirt,
            wood,
            log,
        };

        const newTexture = Object.entries(options).find(
            ([texture, isSelected]) => isSelected
        );

        if (newTexture) {
            const [selectedTexture] = newTexture;
            setTexture(selectedTexture);
        }
    }, [grass, glass, dirt, wood, log, setTexture]);

    const texturesOrdered = Object.values(images)
        .map((imgRoute) => {
            const imgName = imgRoute.split("/").pop().split(".")[0];
            return {
                name: imgName,
                route: imgRoute,
            }
        })
        .sort(
            (a, b) =>
                textureOrder.indexOf(a.name) -
                textureOrder.indexOf(b.name)
    );
    const textures = texturesOrdered.map((image, index) => {
        console.log(image)
        return (
            <img
                className={`texture-item ${
                    image.name === texture ? "selected" : ""
                }`}
                key={index}
                src={image.route}
                alt={index}
                width="100"
                height="100"
            ></img>
        );
    });
    return <div className="texture-selector">{textures}</div>; // Si no necesitas renderizar nada, está bien devolver null
};
