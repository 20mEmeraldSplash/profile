import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser, // 浏览器环境的全局变量
    },
    rules: {
      "prettier/prettier": "error", // 添加 Prettier 作为 ESLint 的规则
      "react/react-in-jsx-scope": "off", // 在 React 17+ 不需要显式引入 React
      "react/prop-types": "off", // 如果不使用 PropTypes，可以禁用这条规则
      "no-console": ["warn", { allow: ["warn", "error"] }], // 禁用 console.log，但允许 console.warn 和 console.error
    },
  },
  pluginJs.configs.recommended, // JavaScript 的推荐规则
  pluginReact.configs.flat.recommended, // React 的推荐规则
  pluginPrettier.configs.recommended, // Prettier 的推荐配置
];
