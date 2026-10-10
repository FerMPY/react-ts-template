# Run the React Compiler natively, without Babel

The React Compiler runs through `oxc-transform-react` (`react({ compiler: true })`), which produced byte-identical output to the Babel plugin on this app and is much faster. `@vitejs/plugin-react` still calls it experimental, so the README shows how to switch back.
