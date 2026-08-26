DYSONTECH VALLADOLID ONE PAGE

Zona: Valladolid (España)

Dominio: https://dyfix.eu/ (PENDIENTE DE CONFIRMAR — es el dominio de
la versión de Madrid, DyFix. Este repo partía de una copia exacta de
DyFix sin adaptar. Se han corregido los textos, la marca y la
dirección para que no muestren datos de Madrid, pero canonical,
og:url, robots.txt, sitemap.xml y el "url" del JSON-LD siguen
apuntando a dyfix.eu hasta que se confirme el dominio real de
Valladolid.)

Teléfono caja y botones: +34 910 05 48 17 (mantenido tal cual, según
indicación del cliente)

Diagnóstico: gratuito
Presupuesto: sin compromiso
Garantía: 6 meses
Mensaje de rapidez: Podemos reparar tu Dyson en 2 h, según la avería.
Repara: aspiradoras, Supersonic, Airwrap y purificadores Dyson.

IMPORTANTE — dirección física:
No se proporcionó una dirección real para Valladolid. Se ha quitado
la dirección de Madrid (C. Joaquín María López, 26) y el bloque de
Metro/aparcamiento (específico de Madrid, sin sentido en Valladolid).
La caja de información ahora muestra "Zona de servicio: Valladolid
capital y alrededores" en su lugar. El enlace y el iframe de Google
Maps se han mantenido sin cambios (según indicación del cliente),
aunque siguen apuntando a la ubicación de Madrid — revisar si debe
sustituirse por una ficha de Google Business de Valladolid.

El correo SMTP no aparece visible en la web; solo se usa en /api/contacto.
Variables Vercel compartidas: SMTP_HOST, SMTP_PORT=465, SMTP_SECURE=true, SMTP_USER, SMTP_PASS, CONTACT_EMAIL.
Google Analytics:
G-PJ9KWB44P6

HISTORIAL: el repositorio era multipágina (10 páginas /modelos/ de
producto Dyson y varias páginas /servicios/, estas últimas con
nombres residuales de "Acer" heredados de la plantilla original antes
de adaptarla) y se convirtió a one-page; esas páginas fueron
eliminadas en commits anteriores. Como ya no existen en el sitemap
actual, se ha añadido middleware.mjs para redirigir (301) cualquier
URL antigua a la home, evitando 404 en enlaces indexados o backlinks
antiguos. Excluye /api/* y cualquier ruta con extensión de archivo. Se
añadió "@vercel/functions": "^2.0.3" a package.json como dependencia
de esta función.

REVISIÓN (fixes aplicados en esta pasada):
- Ya estaba bien: banner de cookies (ya corregido en un commit
  anterior), sección SEO "Guía" (id="sobre-dyson"), menú móvil, borde
  blanco del chat, api/contacto.js con SMTP + nodemailer, teléfono
  +34 910 05 48 17 (no se ha tocado), dominio ya en https://. No se ha
  modificado ninguno de estos.
- Google Analytics: no existía. Añadido G-PJ9KWB44P6.
- Schema.org: faltaba sameAs — añadido, reutilizando el mismo enlace
  de Google Maps y el canal de YouTube que ya aparecían en la propia
  página (sin resolver el aviso pendiente de arriba sobre si esa ficha
  de Maps corresponde a Valladolid o sigue siendo la de Madrid).
- .navcall: el texto largo ("Atención Telefónica 24 horas 365 días")
  deformaba la píldora del menú. Acortado a solo el número (mismo
  número, +34 910 05 48 17) y añadido white-space:nowrap como
  salvaguarda.
- H1 de portada reescrito, corto, directo y totalmente afirmativo
  (sin interrogación ni condicionales), incluye la marca: "Tu Dyson no
  funciona. Nosotros lo dejamos como nuevo." Tamaño del H1 aumentado:
  clamp(38-55px) → clamp(46-73px) en escritorio, 39px → 47px en móvil.

AVISOS PENDIENTES (heredados, no resueltos en esta pasada):
- Confirmar si https://dyfix.eu/ es realmente el dominio de
  DysonTech Valladolid o si sigue siendo el de la versión de Madrid.
- Confirmar si el enlace/iframe de Google Maps corresponde a una
  ubicación de Valladolid o si sigue apuntando a Madrid.
