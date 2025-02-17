import { createLazyFileRoute } from "@tanstack/react-router";

import { TechCard } from "@/components/tech-cards";

import {
  ReactIcon,
  TailwindIcon,
  TanStackIcon,
  TypeScriptIcon,
  ViteIcon,
} from "../components/tech-icons";

export const Route = createLazyFileRoute("/")({
  component: WelcomeComponent,
});

function WelcomeComponent() {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-900 text-white md:flex-row">
      <div className="flex w-full flex-col justify-center p-16 md:w-1/2">
        <h1 className="mb-8 text-5xl font-extrabold text-blue-400">
          Welcome to Your New React Template!
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-300">
          Get started by exploring the file structure and modifying the
          components. This template provides a solid foundation for building
          modern React applications. Enjoy the power of TanStack Router and
          TanStack Query for client side applications.
        </p>
      </div>
      <div className="flex w-full flex-col justify-center bg-gray-800 p-16 md:w-1/2">
        <h2 className="mb-8 text-3xl font-bold text-blue-400">Built With:</h2>
        <div className="grid grid-cols-2 gap-8">
          <TechCard
            icon={<ReactIcon />}
            title="React 19"
            description="A JavaScript library for building user interfaces"
            link="https://react.dev/"
          />
          <TechCard
            icon={<TypeScriptIcon />}
            title="TypeScript"
            description="A superset of JavaScript that adds static typing"
            link="https://www.typescriptlang.org/"
          />
          <TechCard
            icon={<ViteIcon />}
            title="Vite"
            description="A fast build tool and development server"
            link="https://vitejs.dev/"
          />
          <TechCard
            icon={<TailwindIcon />}
            title="Tailwind CSS"
            description="A utility-first CSS framework"
            link="https://tailwindcss.com/"
          />
          <TechCard
            icon={<TanStackIcon />}
            title="TanStack Router"
            description="Type-safe routing for React"
            link="https://tanstack.com/router/v1"
          />
          <TechCard
            icon={<TanStackIcon />}
            title="TanStack Query"
            description="Powerful data synchronization for React"
            link="https://tanstack.com/query/v5"
          />
        </div>
      </div>
    </div>
  );
}
