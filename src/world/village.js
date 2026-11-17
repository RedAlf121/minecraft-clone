import { nanoid } from "nanoid";

/**
 * Generador del mapa inicial: una pequeña aldea construida con bloques
 * para que el jugador encuentre algo más que el terreno vacío.
 *
 * Coordenadas: cada bloque ocupa una unidad y el suelo está en y = -0.5,
 * por lo que los bloques apoyados en el suelo van en y = 0.
 */

const blocks = new Map();

const key = (x, y, z) => `${x},${y},${z}`;

const setBlock = (x, y, z, texture) => {
    blocks.set(key(x, y, z), { pos: [x, y, z], texture });
};

const removeBlock = (x, y, z) => {
    blocks.delete(key(x, y, z));
};

const fill = (x, y, z, width, height, depth, texture) => {
    for (let dx = 0; dx < width; dx++) {
        for (let dy = 0; dy < height; dy++) {
            for (let dz = 0; dz < depth; dz++) {
                setBlock(x + dx, y + dy, z + dz, texture);
            }
        }
    }
};

const walls = (x, z, width, depth, height, texture) => {
    for (let y = 0; y < height; y++) {
        for (let dx = 0; dx < width; dx++) {
            for (let dz = 0; dz < depth; dz++) {
                const isEdge =
                    dx === 0 ||
                    dx === width - 1 ||
                    dz === 0 ||
                    dz === depth - 1;
                if (isEdge) setBlock(x + dx, y, z + dz, texture);
            }
        }
    }
};

const corners = (x, z, width, depth, height, texture) => {
    for (let y = 0; y < height; y++) {
        setBlock(x, y, z, texture);
        setBlock(x + width - 1, y, z, texture);
        setBlock(x, y, z + depth - 1, texture);
        setBlock(x + width - 1, y, z + depth - 1, texture);
    }
};

const windowAt = (x, y, z) => {
    setBlock(x, y, z, "glass");
};

const house = ({ x, z, width = 5, depth = 5, wallHeight = 3 }) => {
    const doorWidth = 2;
    const doorStart = x + Math.floor(width / 2) - (doorWidth - 1);
    const doorZ = z + depth - 1;

    // Muros de madera y esquinas de tronco.
    walls(x, z, width, depth, wallHeight, "wood");
    corners(x, z, width, depth, wallHeight, "log");

    // Puerta de 2 x 2 bloques en la fachada (lado +Z).
    for (let dx = 0; dx < doorWidth; dx++) {
        removeBlock(doorStart + dx, 0, doorZ);
        removeBlock(doorStart + dx, 1, doorZ);
    }

    // Ventanas de cristal en la planta alta.
    const windowY = wallHeight - 1;
    for (let dx = 1; dx < width - 1; dx++) {
        windowAt(x + dx, windowY, z);
        windowAt(x + dx, windowY, doorZ);
    }
    for (let dz = 1; dz < depth - 1; dz++) {
        windowAt(x, windowY, z + dz);
        windowAt(x + width - 1, windowY, z + dz);
    }

    // Tejado piramidal escalonado.
    let roofX = x;
    let roofZ = z;
    let roofWidth = width;
    let roofDepth = depth;
    let roofY = wallHeight;

    while (roofWidth > 0 && roofDepth > 0) {
        const isTop = roofWidth === 1 && roofDepth === 1;
        fill(
            roofX,
            roofY,
            roofZ,
            roofWidth,
            1,
            roofDepth,
            isTop ? "log" : "wood"
        );
        roofX += 1;
        roofZ += 1;
        roofWidth -= 2;
        roofDepth -= 2;
        roofY += 1;
    }
};

const tower = ({ x, z, size = 3, height = 4 }) => {
    const doorX = x + Math.floor(size / 2);
    const doorZ = z + size - 1;

    walls(x, z, size, size, height, "wood");
    corners(x, z, size, size, height, "log");

    removeBlock(doorX, 0, doorZ);
    removeBlock(doorX, 1, doorZ);

    // Aspilleras en los cuatro lados.
    const windowY = height - 2;
    const middle = Math.floor(size / 2);
    windowAt(doorX, windowY, doorZ);
    windowAt(x + middle, windowY, z);
    windowAt(x, windowY, z + middle);
    windowAt(x + size - 1, windowY, z + middle);

    // Plataforma superior con almenas en las esquinas.
    fill(x, height, z, size, 1, size, "wood");
    setBlock(x, height + 1, z, "log");
    setBlock(x + size - 1, height + 1, z, "log");
    setBlock(x, height + 1, z + size - 1, "log");
    setBlock(x + size - 1, height + 1, z + size - 1, "log");
};

const tree = (x, z, trunkHeight = 4) => {
    for (let y = 0; y < trunkHeight; y++) {
        setBlock(x, y, z, "log");
    }

    const top = trunkHeight - 1;

    // Copa alrededor del tronco y una capa superior.
    for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
            if (dx === 0 && dz === 0) continue;
            setBlock(x + dx, top, z + dz, "grass");
        }
    }
    fill(x - 1, top + 1, z - 1, 3, 1, 3, "grass");
    setBlock(x, top + 2, z, "grass");
};

const arch = (x, z, width = 3) => {
    for (let y = 0; y < 3; y++) {
        setBlock(x, y, z, "log");
        setBlock(x + width - 1, y, z, "log");
    }
    for (let dx = 0; dx < width; dx++) {
        setBlock(x + dx, 3, z, "log");
    }
};

export const createVillage = () => {
    blocks.clear();

    // Entrada de la aldea, delante del punto de aparición.
    arch(-2, -10, 5);

    // Viviendas.
    house({ x: -9, z: -18, width: 5, depth: 5 });
    house({ x: 4, z: -22, width: 5, depth: 5 });

    // Torre de vigilancia al fondo.
    tower({ x: -1, z: -30 });

    // Vegetación alrededor.
    tree(9, -10);
    tree(-13, -24);

    return [...blocks.values()].map(({ pos, texture }) => ({
        id: nanoid(),
        pos,
        texture,
    }));
};
