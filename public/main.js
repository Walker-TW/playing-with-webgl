const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

// makes sure that if webgl is not supported via browser then it will throw an error

if (!gl) {
  throw new Error("WebGL not supported on your browser");
}

const vertexData = [0, 1, 0, 1, -1, 0, -1, -1, 0];

const buffer = gl.createBuffer();
// create a buffer of the array buffer type
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// create a new array and use static draw to create something the GPU does not nees to rerender
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
// create a shader of the vertex shader type
// giving statically typed instructions as this is going to the GPU and not running
// on JS instead using a WEBGL language to do so we are giving it source code to run
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
// this is the source code so is the GL shading language
// you have to specify a return type AND as we are not returning anything its void
// gl position is the output of the vertex shader and its a vector/array of 4 components
// attribute is a keyword to tell you what the input is
gl.shaderSource(
  vertexShader,
  `
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1);
}
`
);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(
  fragmentShader,
  `
void main() {
  gl_FragColor = vec4(1, 0, 0, 1);
}
`
);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// get reference the second argument is the label you have given it above
const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
// describes to webGL how it should retrieve attribute data from the currently bound buffer
// how many positions should i read at a time and what type are they
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
// this will tell the GPU to use this program important if you have multiple
gl.useProgram(program);
// can be triangles, point, lines etc
// then what the starting vertex and how many do you want to draw
gl.drawArrays(gl.TRIANGLES, 0, 3);

// All of this can be made much easier via pixi.js and three's
