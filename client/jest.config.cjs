module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: [
    "<rootDir>/src/instrument.test.js",
    "<rootDir>/src/components/General/Sanitized.test.js"
  ],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest", {
      presets: [
        ["@babel/preset-env", {targets: {node: "current"}}],
        ["@babel/preset-react", {runtime: "automatic"}]
      ]
    }]
  }
};
