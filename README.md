# CasaBlanca Coffee Shop ☕️

Frontend moderno para la coffee shop premium **CasaBlanca**, desarrollado con **React 19**, **Vite**, **TailwindCSS v4**, y componentes estilizados con **shadcn/ui**. Ofrece una experiencia visual elegante con animaciones y diseño adaptado a café, tés y productos gourmet.

## 🚀 Tecnologías principales

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-modern%20UI-000000?style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-animations-black?style=flat-square&logo=framer&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide-icons-FFD700?style=flat-square&logo=lucide&logoColor=black)


---

## 📁 Estructura del proyecto

```
src/
├── assets/              # Imágenes y gráficos
├── components/
│   ├── common/          # Botones, íconos, inputs
│   ├── layout/          # Header, footer, navbar
│   ├── sections/
│   │   ├── home/        # Secciones de la landing principal
│   │   ├── lounge/      # Secciones para la página Lounge
│   │   └── products/    # Secciones para productos y catálogo
│   └── ui/              # Componentes base (shadcn)
├── data/                # Datos estáticos (JSON, arrays)
├── hooks/               # Custom hooks
├── lib/                 # Funciones auxiliares
├── pages/               # Vistas como Home, Lounge, Products
├── router/              # Definición de rutas
├── types/               # Tipos globales TypeScript
├── utils/               # Utilidades varias
├── App.tsx
└── main.tsx
```

---

## 🧭 Páginas disponibles

- `/` – Landing principal
- `/lounge` – Lounge de té y café (entorno premium)
- `/products` – Sección moderna de productos
- `/delivery` – Información de entrega *(provisional)*
- `/cart` – Carrito de compras *(provisional)*

---

## 💡 Alias de importación

El alias `@` apunta a la carpeta `src/` para una importación limpia:

```ts
import { Button } from "@/components/ui/button";
```

> ✅ Configurado en `vite.config.ts` y `tsconfig.json`

---

## 🛠️ Scripts disponibles

```bash
npm run dev       # Levanta el servidor en desarrollo
npm run build     # Compila para producción
npm run preview   # Sirve el build de producción localmente
npm run lint      # Linting del código
```

---

## 📦 Instalación

```bash
npm install
# o
pnpm install
```

---

## 📣 Créditos

Diseño y desarrollo por [@AlejandroRomero17](https://github.com/AlejandroRomero17)

Repositorio: [CasaBlanca-Coffee-Shop-Frontend](https://github.com/AlejandroRomero17/CasaBlanca-Coffee-Shop-Frontend)

---

## 🧾 Licencia

MIT
