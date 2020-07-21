const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

// makes sure that if webgl is not supported via browser then it will throw an error

if (!gl) {
  throw new Error("WebGL not supported on your browser");
}
