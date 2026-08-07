# Imágenes de proyectos — Rotaract Arrecifes

## Estructura de carpetas

```
public/
└── images/
    └── proyectos/
        ├── campana-abrigo-2023/
        │   ├── portada.jpg          ← imagen principal (usada en la card)
        │   ├── foto-1.jpg
        │   ├── foto-2.jpg
        │   └── foto-3.jpg
        ├── dia-del-nino/
        │   ├── portada.jpg
        │   ├── foto-1.jpg
        │   └── ...
        └── reforestacion-urbana/
            ├── portada.jpg
            └── ...
```

## Cómo agregar imágenes a un proyecto

1. Colocá las fotos dentro de la carpeta del proyecto correspondiente (el nombre de la carpeta coincide con el `id` del proyecto en `src/data/projectsData.js`).
2. Nombrá la imagen principal `portada.jpg` — es la que se muestra en las cards del carrusel y el grid.
3. Las fotos de galería pueden llamarse `foto-1.jpg`, `foto-2.jpg`, etc.
4. Actualizá `src/data/projectsData.js` con las rutas:

```js
{
  id: 'campana-abrigo-2023',
  imageUrl: '/images/proyectos/campana-abrigo-2023/portada.jpg',
  images: [
    '/images/proyectos/campana-abrigo-2023/foto-1.jpg',
    '/images/proyectos/campana-abrigo-2023/foto-2.jpg',
    '/images/proyectos/campana-abrigo-2023/foto-3.jpg',
  ],
  ...
}
```

## Recomendaciones de imágenes

| Uso        | Resolución recomendada | Formato |
|------------|------------------------|---------|
| Portada    | 800 × 533 px (3:2)     | JPG/WebP |
| Galería    | 1200 × 750 px (16:10)  | JPG/WebP |
| Peso máximo | < 300 KB por foto     | —       |

> **Tip:** Usá [Squoosh](https://squoosh.app) para comprimir las fotos antes de subirlas.
