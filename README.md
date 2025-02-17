# React 19 + TypeScript + Vite Template

> A modern, feature-rich template for building scalable React applications with the latest tools and best practices.

## ✨ Key Features

- 🚀 **React 19** - Experience the future with the new React Compiler
- ⚡ **Vite** - Lightning-fast development with instant HMR
- 🎯 **TypeScript** - Type-safe development with latest features
- 🎨 **TailwindCSS** - Utility-first CSS with modern preset
- 🔄 **TanStack Router** - Type-safe routing with code splitting
- 📡 **TanStack Query** - Powerful data synchronization
- ✅ **Vitest** - Next-generation testing framework
- 📦 **PNPM** - Fast, disk space efficient package manager
- 🔍 **ESLint + Prettier** - Modern linting and code formatting

## ⚠️ Disclaimer

This template is designed to stay cutting-edge, which means it:

    May not suit all workflows due to frequent updates with the latest tools and features.
    Focuses on Client-Side Rendering (CSR) for SPAs. For SSR/SSG, consider using frameworks like:
        Next.js
        Remix (React Router 7)
        TanStack Start (beta).
    Includes experimental features that are tested but could still pose compatibility risks.

## 📚 Documentation

### Preretirement

Latest lts for node js, and pnpm installed.

### Getting Started

Two options here either use github's `Use this template` button or do it by cloning the code, there is a script to help clean up git and setup it up.

```bash
# Clone the repository
git clone https://github.com/FerMPY/react-ts-template.git my-app

# Navigate to project directory
cd my-app

# Install dependencies
pnpm install

# CLean up git
pnpm node --experimental-strip-types ./scripts/setup.ts

# Start development server
pnpm dev
```

### Available Scripts

| Command             | Description                |
| ------------------- | -------------------------- |
| \`pnpm dev\`        | Start development server   |
| \`pnpm build\`      | Build for production       |
| \`pnpm preview\`    | Preview production build   |
| \`pnpm test\`       | Run tests                  |
| \`pnpm format\`     | Run Prettier over the code |
| \`pnpm lint\`       | Lint code                  |
| \`pnpm type-check\` | Check types                |

### Project Structure

```
.
├── eslint.config.js
├── index.html
├── LICENCE
├── lint-staged.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   ├── React-icon.svg
│   ├── tailwind.png
│   ├── tanstack.webp
│   ├── typescript.svg
│   └── vite.svg
├── README.md
├── scripts
│   └── setup.ts
├── src
│   ├── components
│   ├── main.tsx
│   ├── queries
│   ├── routes
│   ├── routeTree.gen.ts
│   ├── styles
│   └── vite-env.d.ts
├── tailwind.config.ts
├── tests
│   ├── setup.tsx
│   └── utils
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Performance Optimizations

- ⚡ Route-based code splitting
- 🔄 Optimistic updates with TanStack Query
- 📦 Tree-shaking for smaller bundles
- 🎯 Type-only imports
- 🚀 React Compiler optimizations

### Testing

This template comes with a little helper `render-with-router` to help with writing tests with Tanstack Router, this comes with 2 options withUser that will add a user so you can run the tests and a with withQueryClient that adds Tanstack query to your tests, also globals are turned for Vitest.

```typescript
// Example test using Vitest with render-with-router
import { renderWithRouter } from ".";
import { useRouter } from "@tanstack/react-router";

const TestComponent = () => {
  const _router = useRouter({ warn: true });

  return <div>TestComponent</div>;
};

describe('Button', () => {
  it('renders correctly', () => {
    { user } = renderWithRouter(TestComponent, { withUser: true, withQueryClient: true });
    user.click('button');
  });
});
```

## 🛠️ Tools and Libraries for React Development

While this template provides a solid foundation, you might find these additional tools and libraries useful as your application grows:

### State Management

[Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction): A minimal, unopinionated state management library cwith a simple API and hooks.
[Jotai](https://jotai.org/): A primitive and flexible state management library for React with atomic state.

### UI/UX Libraries

[Fluid-Tailwind](https://fluid.tw/): A utility-focused library that extends TailwindCSS for a more fluid design approach.
[shadcn/ui](https://ui.shadcn.com/c): A modern library that combines design tokens and utility classes for rapid UI development.

### ORMs

[Prisma](https://www.prisma.io/): A powerful ORM for working with databases, enabling type-safe queries and schema migrations.
[Drizzle](https://orm.drizzle.team/): A lightweight ORM alternative that offers a simpler API for SQL databases.

### Headless UI Components

[Radix UI](https://www.radix-ui.com/): A library of low-level, unstyled UI components for accessibility and customization.
[Headless UI](https://headlessui.com/): Tailored for React and Vue, it provides accessible, unstyled components that work seamlessly with TailwindCSS.
[React Aria](https://react-spectrum.adobe.com/react-aria/index.html): A suite of React hooks that helps you build accessible and robust user interfaces.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## ⚠️ Limitations and Known Issues

- React 19 just released there could be dependency issues
- Some features might be experimental, they are tested before benign added to the template but still be careful.

---

<div align="center">

Made with ❤️ by Fernando Mendoza

[⬆ Back to top](#react-19--typescript--vite-template)

</div>
