// vite.config.js
export default {
  esbuild: {
    jsxFactory: "React.createElement",
  },
  optimizeDeps: {
    include: ["redux", "react-redux", "redux-thunk"],
  },
};
