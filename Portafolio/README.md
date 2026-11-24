# Proyecto Portafolio (Sección 12 – Curso "JavaScript desde cero")

Portafolio web de un freelancer ("Carlos Arturo"): hero con efecto de escritura y burbujas animadas, galería de trabajos con animación de entrada y ventana modal, carrusel de comentarios arrastrable con el mouse y popup con el correo (en imagen, para evitar bots).

## Estructura
| Ruta | Contenido |
|---|---|
| `index.html` | Marcado: header, hero, trabajos, comentarios, footer y 2 ventanas modales |
| `sass/` | Estilos por componente (`_hero`, `_trabajos`, `_comentarios`, `_ventana`…) → `public/bundle.css` |
| `src/` | Módulos JS → empaquetados por Rollup en `public/bundle.js` |
| `img/` | Imágenes |

## Cómo ejecutarlo
```bash
npm install
npm run sass     # compila Sass (watch)
npm run build    # Rollup (watch)
```
Servir la carpeta con cualquier servidor estático (p. ej. `python -m http.server`) y abrir `index.html`.

## Clases de la sección 12 y qué se aprende
| # | Clase | Qué se implementa | Qué se debe aprender |
|---|---|---|---|
| 184 | Presentación del proyecto | Demo del resultado final | Identificar las piezas: animación de texto, galería, modales, slider |
| 185 | Inicio del proyecto | Carpeta, Sass, Rollup, recursos | Flujo de trabajo con Sass + bundler (`import`/`export`, `rollup.config.js`) |
| 186 | Estructura del código HTML | `index.html` completo con BEM | Maquetado semántico, nomenclatura BEM, `data-*` attributes |
| 187 | Explicando el efecto escritura | Diseño de la lógica | Dividir un problema: letras con `setTimeout`, cursor, encadenar títulos |
| 188–190 | Efecto escritura (partes 1–3) | `src/animarTexto.js` | `dataset`, `setTimeout` con delay `100*i`, crear nodos (`createElement`, `append`), clases de cursor, devolver una `Promise` y usar `async/await` en `index.js` con el evento `load` |
| 191 | Animación de burbujas | Clases `hero__burbuja--active-1/2` | Disparar animaciones CSS desde JS al terminar otra animación |
| 192 | Animación de galería | `src/animarGaleria.js` | `IntersectionObserver` (`threshold`, `rootMargin`), mostrar imágenes escalonadas (`index * 200` ms) |
| 193–194 | Eventos de la galería (partes 1–2) | `src/galeria.js` | Delegación de eventos, `closest()`, `preventDefault`, array de datos, `filter`, actualizar el DOM (`innerText`, `src`), abrir/cerrar modal con `ventana--active` y cerrar por overlay con `matches()` |
| 195 | Carousel de comentarios | `src/slider.js` | `mousedown/mousemove/mouseup/mouseleave`, `pageX`, `offsetLeft`, `scrollLeft`, estado con una variable booleana |
| 196 | Popup de correo | `src/ventanaCorreo.js` | `querySelectorAll` + `forEach`, reutilizar el patrón de modal, ocultar el correo como imagen |

> Nota: la numeración y títulos salen del índice del curso en Udemy (13 clases, 2h37min). El detalle de cada clase se infiere del código del proyecto; los videos no se reprodujeron.

## Correcciones realizadas en la revisión
- `galeria.js`: la ventana de trabajos se abría al hacer clic en cualquier parte de la sección (título, espacios); ahora solo al clicar un trabajo.
- `slider.js`: eliminados `console.log` de depuración y añadido `mouseleave` para que el arrastre termine si el mouse sale del slider.
- `animarGaleria.js`: se quitó código sin uso y el `addEventListener('load', observer.observe(...))` erróneo (ejecutaba `observe` inmediatamente).
- `package.json`: faltaba la dependencia `sass` que usa el script `npm run sass`.
- `public/bundle.js` actualizado a mano con los mismos cambios (Rollup no está instalado aquí).
