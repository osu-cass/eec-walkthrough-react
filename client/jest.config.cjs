module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
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
