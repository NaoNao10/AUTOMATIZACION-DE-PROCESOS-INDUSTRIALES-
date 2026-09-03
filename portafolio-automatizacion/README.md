# Portafolio de automatización

Sitio estático del portafolio sobre automatización industrial y de servicios.
Cada "card" (tarjeta temática) vive en su propia carpeta, con su propio
`index.html`, `css/` y `js/`, para poder agregar nuevas tarjetas sin romper
las anteriores.

## Estructura

```
portafolio-automatizacion/
└── card-01-conceptos-basicos/
    ├── index.html      → contenido de la card 01
    ├── css/
    │   └── styles.css  → estética arquitectónica/futurista (grilla técnica,
    │                      cartela tipo plano, marcas de registro)
    └── js/
        └── main.js     → barra de progreso de scroll + resaltado del
                           ítem activo en el panel de navegación
```

Cuando agregues la card 02, crea una carpeta hermana
(`card-02-<nombre>/`) con la misma estructura interna. Cada card es
autocontenida: puedes copiar `card-01-conceptos-basicos/` como plantilla
y reemplazar el contenido del `index.html`.

## Ver en local

No requiere build ni dependencias. Basta con abrir el archivo
`card-01-conceptos-basicos/index.html` en el navegador, o servirlo con
cualquier servidor estático, por ejemplo:

```bash
cd card-01-conceptos-basicos
python3 -m http.server 8000
```

y abrir `http://localhost:8000`.

## Publicar en GitHub Pages

1. Sube esta carpeta a tu repositorio de GitHub (puede ser la raíz del
   repo o una subcarpeta).
2. En el repositorio: **Settings → Pages → Build and deployment**.
3. En **Source** elige `Deploy from a branch`, selecciona la rama
   (normalmente `main`) y la carpeta (`/root` o `/docs` según dónde
   hayas colocado los archivos).
4. GitHub publicará el sitio en `https://<tu-usuario>.github.io/<repo>/`.

Si quieres que la card 01 sea la portada del sitio, puedes:
- Renombrar `card-01-conceptos-basicos/index.html` para que quede en la
  raíz del repo, o
- Crear un `index.html` en la raíz que redirija a
  `card-01-conceptos-basicos/index.html`.

## Notas de diseño

- Tipografías: `Space Grotesk` (títulos), `IBM Plex Sans` (cuerpo),
  `IBM Plex Mono` (coordenadas, etiquetas técnicas, cartela).
- Paleta: fondo casi negro con grilla de plano técnico de fondo, acento
  cian (`--cyan`) para elementos "activos/de control" y acento coral
  (`--coral`) para advertencias y el lado "servicios" de las
  comparaciones.
- El panel lateral (`.rail`) funciona como un panel de capas de software
  de diseño: resalta la sección visible mediante `IntersectionObserver`
  (`js/main.js`).
- Los estilos usan variables CSS en `:root` — cambia los valores en
  `css/styles.css` para ajustar la paleta sin tocar el HTML.
