module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/react-in-jsx-scope": "off",
  },
};
