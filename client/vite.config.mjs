import {fileURLToPath} from "node:url";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import {configDefaults} from "vitest/config";
import {
  defineConfig,
  loadEnv,
  normalizePath,
  transformWithEsbuild
} from "vite";

const sourceDirectory = `${normalizePath(fileURLToPath(new URL("./src", import.meta.url)))}/`;

function legacyJsxInJs() {
  return {
    name: "legacy-jsx-in-js",
    enforce: "pre",
    async transform(code, id) {
      const filePath = normalizePath(id.split("?", 1)[0]);

      if (!filePath.startsWith(sourceDirectory) || !filePath.endsWith(".js")) {
        return null;
      }

      const result = await transformWithEsbuild(code, filePath, {
        loader: "jsx",
        sourcemap: true,
        jsx: "automatic"
      });

      result.warnings.forEach(warning => this.warn(warning));

      return {
        code: result.code,
        map: result.map
      };
    }
  };
}

export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiHost = env.REACT_APP_API_HOST === undefined
    ? "undefined"
    : JSON.stringify(env.REACT_APP_API_HOST);

  return {
    plugins: [
      legacyJsxInJs(),
      react({include: /\.[jt]sx?$/}),
      legacy({
        targets: [">0.2%", "not dead", "not op_mini all"]
      })
    ],
    define: {
      "process.env.NODE_ENV": JSON.stringify(command === "build" ? "production" : "development"),
      "process.env.REACT_APP_API_HOST": apiHost
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          ".js": "jsx"
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
      proxy: {
        "/api": "http://localhost:1111"
      }
    },
    build: {
      outDir: "build",
      sourcemap: true
    },
    test: {
      environment: "jsdom",
      globals: true,
      exclude: [
        ...configDefaults.exclude,
        "src/instrument.test.js",
        "src/components/General/Sanitized.test.js"
      ],
      setupFiles: "./src/test/setup.js",
      clearMocks: true,
      restoreMocks: true
    }
  };
});
