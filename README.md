# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# My Notes

```sh
npx shadcn-ui@latest add accordion carousel card drawer input label radio-group select textarea
npm i react-router-dom@6.26.0
npm i @supabase/supabase-js
npm i @clerk/themes
npm i react-spinners
```

```bash
# Tailwind CSS Breakpoints
Breakpoint prefix	Minimum width	CSS
sm					40rem (640px)	@media (width >= 40rem) { ... }
md					48rem (768px)	@media (width >= 48rem) { ... }
lg					64rem (1024px)	@media (width >= 64rem) { ... }
xl					80rem (1280px)	@media (width >= 80rem) { ... }
2xl					96rem (1536px)	@media (width >= 96rem) { ... }
```

> NOTE: Users role will be stored in `unsafeMetadata` (but we can also save it in database).

Frontend is setup, Now db setup at `1:16:00`. So, making a commit so that we can later access for custom changes.
