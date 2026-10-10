# Run the React Compiler natively, without Babel

The React Compiler runs through `oxc-transform-react`, Oxc's port of the React team's Rust compiler, enabled with `react({ compiler: true })`. Its output was byte-identical to `babel-plugin-react-compiler` on this app, it is much faster, and it removes Babel from the project's own setup.

## Consequences

- `@vitejs/plugin-react` labels the integration experimental. The README shows how to switch back to Babel.
- The plugin pins a 0.x range of `oxc-transform-react`, so Dependabot skips its minor versions and it gets updated together with the plugin.
