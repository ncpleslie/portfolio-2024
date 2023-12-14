module.exports = {
  extends: ["plugin:astro/recommended", "plugin:jsx-a11y/recommended"],
  plugins: ["jsx-a11y"],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {},
    },
  ],
};
