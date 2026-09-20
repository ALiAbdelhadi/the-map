import { defineConfig } from "eslint/config";
import globals from "globals";

import { baseConfig } from "./base.js";

/** Config for React component packages that are consumed by an app. */
export const reactLibraryConfig = defineConfig([
  ...baseConfig,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.serviceworker },
    },
  },
]);

export default reactLibraryConfig;
