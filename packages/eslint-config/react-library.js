import { defineConfig } from "eslint/config";
import globals from "globals";

import { baseConfig } from "./base.js";

export const reactLibraryConfig = defineConfig([
  ...baseConfig,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.serviceworker },
    },
  },
]);

export default reactLibraryConfig;
