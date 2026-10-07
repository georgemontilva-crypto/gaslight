# Gas Light — Premium Gas Only

Sitio informativo de la marca, con los reportes de laboratorio de cada lote y un
panel para cargarlos.

| Ruta | Qué es |
|---|---|
| `/` | Home: logo y los tres empaques entre las llamas, la marca (con el video destacado), las tres líneas, reels, lo que dice la etiqueta, buscador de reportes y preguntas |
| `/products` | Todas las cepas, con filtro por línea y por tipo (indica / sativa / hybrid) |
| `/products/:slug` | Una cepa: foto (o dos: frasco y display box), descripción, botón a su reporte y el resto de la línea |
| `/lab-reports` | Reportes de todos los lotes, con búsqueda por cepa o número de lote |
| `/about` | About Us |
| `/contact` | Contact Us: formulario + datos de la empresa |
| `/admin` | Panel: lab reports, productos, videos, mensajes, datos de contacto, admins |

El sitio pide confirmar 21+ en la primera visita (se recuerda en el dispositivo).

## Stack

React 19 + Vite + wouter · tRPC 11 + Express · Drizzle ORM + MySQL ·
Cloudflare R2 · Tailwind 4 · Railway. Tipografías autoalojadas (New Rocker y
Archivo variable), sin llamadas a Google Fonts.

## Diseño

Sale del empaque: tablones de madera carbonizada, fuego subiendo por los bordes,
el logo gótico en color hueso con su lema en dorado, y **un color por cepa**.
Cada producto guarda su color (`accentColor`) y su página, su tarjeta y su fila
de reportes lo toman a través de la variable CSS `--accent`.

El fuego son las llamas del propio empaque (`client/public/brand/flame-*.webp`)
compuestas con `mix-blend-mode: screen`, más un lienzo de brasas
(`client/src/components/Fire.tsx`). Todo se detiene con
`prefers-reduced-motion`, y las brasas se pausan fuera de pantalla.

El logo (`client/public/brand/logo.svg`) está vectorizado a partir del arte del
empaque: `logo.svg` es el conjunto completo, `logo-mark.svg` solo la llama con
GAS LIGHT, y `favicon.svg` la llama.

---

## Variables de entorno

| Variable | Para qué | Obligatoria |
|---|---|---|
| `DATABASE_URL` | MySQL. En Railway: `${{MySQL.MYSQL_URL}}` | Sí |
| `JWT_SECRET` | Firma de la sesión del admin. Larga y aleatoria | Sí |
| `ADMIN_SETUP_TOKEN` | Secreto para crear el **primer** admin. Borrarla después | Sí, al inicio |
| `SEED_CATALOG` | `true` carga las 18 cepas al arrancar. Borrarla después | Solo la primera vez |
| `R2_ACCOUNT_ID` | Cloudflare R2 | Para subir archivos |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 | Para subir archivos |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 | Para subir archivos |
| `R2_BUCKET` | Nombre del bucket | Para subir archivos |
| `R2_PUBLIC_URL` | URL pública del bucket, sin barra final | Para subir archivos |
| `RESEND_API_KEY` | Aviso por email de los mensajes de contacto | No |
| `RESEND_FROM_EMAIL` | Remitente en un dominio verificado en Resend | No |
| `CONTACT_TO_EMAIL` | A dónde llegan los avisos | No |
| `PORT` | Lo inyecta Railway | No |

Sin las de R2 el sitio funciona igual; lo único que no se puede es **subir**
archivos (los reportes se pueden enlazar por URL mientras tanto).

Sin las de Resend los mensajes de contacto se guardan y se leen en
`/admin/messages`; simplemente no llega email.

---

## Desplegar en Railway

1. **New Project → Deploy from GitHub repo** → `georgemontilva-crypto/gaslight`.
2. En el mismo proyecto: **New → Database → MySQL**.
3. En el servicio web, pestaña **Variables**, crear:
   - `DATABASE_URL` = `${{MySQL.MYSQL_URL}}`
   - `JWT_SECRET` = una cadena larga y aleatoria
   - `ADMIN_SETUP_TOKEN` = otra cadena larga y aleatoria (apúntala, se usa en el paso 6)
   - `SEED_CATALOG` = `true`
   - las cinco `R2_…`
4. Esperar el deploy. En los logs debe salir:
   `[Migrations] Database is up to date.` y `[Seed] Done. 18 product(s) added.`
5. **Settings → Networking → Generate Domain** (o conectar el dominio propio).
6. Abrir `https://TU-DOMINIO/admin/login`, pegar el `ADMIN_SETUP_TOKEN` y crear
   la cuenta de admin.
7. Volver a **Variables** y **borrar** `ADMIN_SETUP_TOKEN` y `SEED_CATALOG`.

Las migraciones se aplican solas en cada arranque (`server/migrate.ts`); no hay
que correr nada a mano contra la base.

### CORS del bucket de R2 (necesario para los videos)

Los PDF y las fotos suben aunque el bucket no tenga CORS (pasan por el servidor
como respaldo, hasta 30 MB). Los videos de más de 30 MB solo pueden subir
directo del navegador a R2, y para eso el bucket tiene que permitirlo.

Cloudflare → R2 → el bucket → **Settings → CORS Policy → Edit**, y pegar
(cambiando el dominio):

```json
[
  {
    "AllowedOrigins": ["https://TU-DOMINIO", "http://localhost:3000"],
    "AllowedMethods": ["PUT", "GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

Conecta el dominio propio del bucket **antes** de subir archivos de producción:
las URLs se guardan completas en la base. Si `R2_PUBLIC_URL` cambia después, el
botón **Repair file links** de `/admin/lab-reports` las reescribe.

---

## Uso del panel

- **Lab Reports**: elegir la cepa, escribir el **número de lote tal como está
  impreso en el empaque** (los clientes buscan por él, p. ej. `GL090426GP`),
  subir el PDF. Una cepa puede tener varios reportes, uno por lote.
- **Products**: nombre, línea, tipo, color de etiqueta, formato, descripción
  y foto. Hay una **segunda foto** opcional para el otro empaque del mismo
  producto (los THC Pre-Rolls vienen en frasco y en display box). Las fotos se
  ven mejor en PNG o WebP con fondo transparente.
- **Videos**: clips verticales (9:16) en MP4. El marcado con estrella sale en
  grande junto a la presentación de la marca, justo debajo del inicio del Home;
  los demás, en la fila "On camera". Sin estrella, la presentación sale sin
  video.
- **Messages**: lo que llega por Contact Us.
- **Contact details**: empresa, email, teléfono, dirección e Instagram que salen
  en el pie y en Contact Us.

### QR de los empaques

Los reportes viven en la página Lab Reports. El QR impreso es dinámico
(`qr.codes/…`), así que su destino se puede apuntar a la búsqueda con el lote o
la cepa ya escritos:

- `https://TU-DOMINIO/lab-reports?q=GL090426GP` (por número de lote)
- `https://TU-DOMINIO/lab-reports?q=Granddaddy%20Purple` (por cepa)

---

## Desarrollo local

```bash
pnpm install
cp .env.example .env      # y rellenar
pnpm dev                  # http://localhost:3000
```

```bash
pnpm check                # tsc --noEmit
pnpm test                 # vitest
pnpm build                # cliente + bundle del servidor
pnpm seed                 # carga las 18 cepas (necesita DATABASE_URL)
```

### Cambiar el esquema

**No uses `drizzle-kit push`**: compara el esquema vivo contra `schema.ts` y
ofrece truncar tablas cuando ve una diferencia que no sabe reconciliar.

```bash
# 1. editar drizzle/schema.ts
# 2. generar el SQL
DATABASE_URL="mysql://x:y@localhost:3306/z" npx drizzle-kit generate --name descripcion_del_cambio
# 3. commitear el .sql generado junto con el cambio de schema.ts
```

El siguiente deploy lo aplica solo.

---

## Dónde está cada cosa

| | |
|---|---|
| `client/public/products/` | Las 24 fotos de producto que vienen con el sitio (18 cepas + 6 display box) |
| `client/public/brand/` | Logo vectorial (SVG), favicon, llamas y madera carbonizada del empaque |
| `client/src/index.css` | Sistema visual: tipos de la etiqueta, recuadros, botones, fuego |
| `client/src/components/Fire.tsx` | Llamas, brasas y la regla dorada |
| `shared/lines.ts` | Las tres líneas: orden, formato y texto de cada una |
| `shared/const.ts` | Datos de contacto por defecto, temas del formulario |
| `server/seed.ts` | Las 18 cepas: nombre, tipo, color y datos de etiqueta |
| `drizzle/schema.ts` | Tablas |
