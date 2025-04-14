# CasaBlanca Coffee Shop ☕️

Frontend moderno para la coffee shop premium **CasaBlanca**, desarrollado con **React 19**, **Vite**, **TailwindCSS v4**, y componentes estilizados con **shadcn/ui**.

---

## 🚀 Tecnologías usadas

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) – Componentes accesibles con diseño moderno
- [Lucide Icons](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/) – Animaciones suaves
- [AOS](https://michalsnik.github.io/aos/) – Animaciones al hacer scroll

---

## 📁 Estructura del proyecto

```
src/
├── assets/              # Imágenes y gráficos
├── components/
│   ├── common/          # Botones, encabezados, etc.
│   ├── sections/        # Secciones de la landing (Hero, AboutUs, etc.)
│   └── ui/              # Componentes base (shadcn)
├── lib/                 # Funciones auxiliares (e.g. className merge)
├── App.tsx
└── main.tsx
```

---

## 💡 Alias de importación

Para mayor limpieza, se usa el alias `@` apuntando a `src/`.

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

## ⚙️ Consideraciones técnicas

- `tsconfig.app.json` hereda de `tsconfig.json` para mantener alias y tipos.
- `vite.config.ts` está excluido del build para evitar errores con ESM (`__dirname`).
- El proyecto está preparado para usar animaciones tanto con Framer Motion como AOS.
- Componentes como `Button`, `Input` y más están generados con `shadcn`.

---

## 📦 Instalación

```bash
npm install
# o
pnpm install
```

---

## 📣 Créditos

Diseño y desarrollo por [@Alejandro](https://github.com/tu-github)

---

## 🧾 Licencia

MIT
