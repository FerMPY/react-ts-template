import { createLazyFileRoute } from "@tanstack/react-router";

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
          modern React applications. Enjoy! the power of TanStack Router and
          TanStack Query for client side applications.
        </p>
      </div>
      <div className="flex w-full flex-col justify-center bg-gray-800 p-16 md:w-1/2">
        <h2 className="mb-4 text-3xl font-bold text-blue-400">Built With:</h2>
        <ul className="list-none pl-0">
          <li className="mb-4">
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-300 hover:text-blue-500"
            >
              React 19
            </a>
            : A JavaScript library for building user interfaces.
          </li>
          <li className="mb-4">
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-300 hover:text-blue-500"
            >
              TypeScript
            </a>
            : A superset of JavaScript that adds static typing.
          </li>
          <li className="mb-4">
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-300 hover:text-blue-500"
            >
              Vite
            </a>
            : A fast build tool and development server.
          </li>
          <li className="mb-4">
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-300 hover:text-blue-500"
            >
              Tailwind CSS
            </a>
            : A utility-first CSS framework.
          </li>
          <li className="mb-4">
            <a
              href="https://tanstack.com/router/v1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-300 hover:text-blue-500"
            >
              TanStack Router
            </a>
            : Type-safe routing for React.
          </li>
          <li className="mb-4">
            <a
              href="https://tanstack.com/query/v5"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-300 hover:text-blue-500"
            >
              TanStack Query
            </a>
            : Powerful data synchronization for React.
          </li>
        </ul>
      </div>
    </div>
  );
}
