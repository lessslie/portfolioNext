# PortfolioNext

Aquí muestro mis proyectos.

## Qué es

Portfolio personal que muestra proyectos desarrollados y pruebas técnicas. Está implementado con Next.js (app router), TypeScript y TailwindCSS, con animaciones usando Framer Motion.

## Estructura y funcionamiento

- Componentes clave:
  - `app/components/hero.tsx`: hero con efecto de partículas y flecha de scroll suave.
  - `app/components/portfolio.tsx`: listado de proyectos y `VideoCarousel` que muestra imágenes y videos.
  - `app/components/gallery.tsx`, `contact.tsx` y `footer.tsx`.
- Assets: coloca imágenes y videos en `public/` (p. ej. `/ml1.png`, `/salud-publica-1.png`, `/videos/mlVIDEO.mp4`). Evita espacios en los nombres.
- Formato de proyecto (ejemplo en `portfolio.tsx`):

```ts
{
  id: 6,
  title: "MeliInsights",
  description: "Descripción corta",
  year: "2025",
  image: "/ml1.png",
  videos: ["/ml2.png", "/videos/mlVIDEO.mp4"],
  links: [{ label: "Demo", url: "https://..." }]
}
```

- `VideoCarousel` renderiza `<img>` si la ruta termina en `.png|.jpg|.jpeg|.svg` y `<video>` para `.mp4`/`.webm`.

## Scripts y desarrollo

- `pnpm dev` / `npm run dev` — desarrollo
- `pnpm build` / `npm run build` — build de producción
- `pnpm start` / `npm run start` — correr build en producción

## Notas técnicas

- Smooth scroll personalizado implementado en `hero.tsx` (`smoothScrollToId`) para un desplazamiento lento y accesible.
- Cambia la altura del carrusel con el prop `heightClass` si querés mostrar capturas más grandes (`h-72`, `h-80`, etc.).

## Contacto

Información de contacto en la web.

