const ISFRenderer = require('interactive-shader-format').Renderer

const canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gl = canvas.getContext("webgl")
const renderer = new ISFRenderer(gl)

// TODO: https://github.com/skeeto/webgl-game-of-life lelelelelele

const isfFragment = `
/*{
  "INPUTS": []
}*/

#ifdef GL_ES
precision mediump float;
#endif

void main() {
  float B = 2.;
  float U = 13.;
  float I = U * U;
  float M = pow(2., I);
  float V = 1.;

  float t = TIME * pow(2., 10.);
  vec2 uv = floor(isf_FragNormCoord * U);
  float i = uv.x + (U * uv.y);
  float m = pow(B, i);
  float v = mod(t / m, B) / B;

  gl_FragColor = vec4(v, v, v, 1.);
}
`
renderer.loadSource(isfFragment)

const animate = () => {
  requestAnimationFrame(animate)
  renderer.draw(canvas)
}
animate()