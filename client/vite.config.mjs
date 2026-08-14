import {fileURLToPath} from "node:url";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import {
  defineConfig,
  loadEnv,
  normalizePath,
  transformWithOxc
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

      const result = await transformWithOxc(code, filePath, {
        lang: "jsx",
        sourcemap: true,
        jsx: {
          runtime: "automatic"
        }
      });

      result.warnings.forEach(warning => this.warn(warning));

      return {
        code: result.code,
        map: result.map,
        moduleType: "js"
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
      rolldownOptions: {
        moduleTypes: {
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
      outDir: "build"
    },
    test: {
      environment: "jsdom",
      globals: true
    }
  };
});
