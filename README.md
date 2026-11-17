# Minecraft Clone in React!

<img src="https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Global-Header_Image-Tile_MC-Java-Bedrock_570x321.jpg?v=1719853661930"/>

Clon de Minecraft jugable en el navegador, construido con **React**, **Three.js** y **React Three Fiber**. El objetivo del proyecto es experimentar con renderizado 3D, físicas y gestión de estado en una aplicación web, recreando la experiencia básica de explorar y construir con bloques.

## Demo

Desplegado en Vercel: **[https://minecraft-clone-jet.vercel.app](https://minecraft-clone-jet.vercel.app)**

## Objetivo

- Renderizar un mundo 3D de bloques con texturas pixeladas en el navegador.
- Permitir al jugador **construir y destruir** bloques en tiempo real.
- Aplicar **física** (gravedad, colisiones y saltos) con `@react-three/cannon`.
- Practicar una arquitectura limpia en React: componentes 3D, hooks y estado global con Zustand.
- Ofrecer un **mapa inicial de ejemplo** para que el jugador encuentre una aldea ya construida en lugar de un terreno vacío.

## Características

- Mundo inicial con una aldea: dos casas, una torre de vigilancia, un arco de entrada y árboles.
- Colocación y eliminación de bloques con el ratón.
- Cinco materiales: césped, cristal, tierra, tablones y tronco.
- Movimiento en primera persona con captura del puntero (pointer lock).
- Física de jugador con esfera, gravedad, salto y límites del mapa.
- Texturas cargadas localmente y empaquetadas por Vite.

## Controles

| Acción | Control |
| --- | --- |
| Capturar el ratón | Clic sobre el canvas |
| Moverse | `W` `A` `S` `D` |
| Saltar | `Espacio` |
| Eliminar bloque | Clic izquierdo |
| Colocar bloque | Clic derecho |
| Seleccionar material | `1` a `5` |
| Liberar el ratón | `Esc` |

## Tecnologías

- [React 18](https://react.dev/)
- [Vite 6](https://vite.dev/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) y [Drei](https://github.com/pmndrs/drei)
- [React Three Cannon](https://github.com/pmndrs/react-three-cannon) para las físicas
- [Zustand](https://zustand-demo.pmnd.rs/) para el estado global
- [nanoid](https://github.com/ai/nanoid) para los identificadores de bloques

## Desarrollo local

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev      # http://localhost:5173
```

Para generar y probar el build de producción:

```bash
npm run build    # genera dist/
npm run preview  # http://localhost:4173
```

También disponible: `npm run lint`.

## Estructura del proyecto

```
src/
├── components/       # Escena 3D, cámara, jugador, bloques y selector de texturas
├── hooks/            # Estado global y teclado
├── images/           # Texturas y carga de materiales
├── world/village.js  # Generador del mapa inicial (aldea)
├── App.jsx
└── main.jsx
```

El mapa de ejemplo se define en `src/world/village.js` y se carga como estado inicial en `src/hooks/useStorage.js`.

## Despliegue

Es una SPA estática (React + Vite + react-three-fiber) sin backend ni variables de entorno. Vercel toma la configuración de `vercel.json`:

- **Framework:** `vite`
- **Install:** `npm ci`
- **Build:** `npm run build`
- **Output:** `dist/`
- Caché inmutable para los archivos con hash en `/assets/*`

El despliegue se realizó con Vercel CLI:

```bash
vercel deploy --prod --yes
```

Con el repositorio conectado, cada push a `main` genera un despliegue automático en Vercel.

### Espero que les guste
