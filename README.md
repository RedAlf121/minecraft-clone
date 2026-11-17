# Minecraft Clone in React!

<img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2017/02/guia-todos-trucos-consejos-minecraft.jpg?tf=1200x"/>

## Demo

Desplegado en Vercel: **[https://minecraft-clone-jet.vercel.app](https://minecraft-clone-jet.vercel.app)**

## Desarrollo local

Requiere Node.js 22.x.

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

No hace falta un Dockerfile: Vercel construye el proyecto automáticamente con el preset de Vite y sirve los archivos estáticos desde su CDN.

### Espero que les guste
