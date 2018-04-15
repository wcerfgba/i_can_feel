const ISFRenderer = require('interactive-shader-format').Renderer

const canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gl = canvas.getContext("webgl")
const renderer = new ISFRenderer(gl)

const isfFragment = `
/*{
  "INPUTS": [],
  "PASSES": [
    {
      "TARGET": "prev",
      "PERSISTENT": true
    }
  ]
}*/

#ifdef GL_ES
precision mediump float;
#endif

void main() {
  const float B = 2.;
  const float U = 13.;
  const float I = U * U;
  const float M = pow(2., I);
  const float V = 1.;

  vec2 uv = floor(isf_FragNormCoord * U);
  float i = uv.x + (U * uv.y);
  vec3 v = IMG_PIXEL(prev, gl_FragCoord.xy).rgb;

  for (float j = 0.; j < I; j += 1.) {
    if (i == 0.) {
      break;
    }
    vec2 xy = vec2(j - U*floor(j/U), floor(j/U));
    vec3 v_prev = IMG_PIXEL(prev, xy.xy).rgb;
    if (v_prev.r == 0.) {
      break;
    }
    if (j == (i - 1.)) {
      v = vec3(1. - v.r, 1. - v.r, 1. - v.r);
      break;
    }
  }

  if (i == 0.) {
    v = vec3(1. - v.r, 1. - v.r, 1. - v.r);
  } 

  gl_FragColor = vec4(v.rgb, 1.);
}
`
renderer.loadSource(isfFragment)

const animate = () => {
  requestAnimationFrame(animate)
  renderer.draw(canvas)
}
animate()


// const canvas = document.getElementById('canvas')
// const ctx = canvas.getContext('2d')

// const draw = () => {
//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
//   const data = imageData.data
    
//   for (let i = 0; i < data.length; i += 4) {


//     for (let c = 0; c < 3; c++) {
//       data[i + c] = (data[i + c] + 1) % 255
//     }
//     data[i + 3] = 255  
//   }
//   ctx.putImageData(imageData, 0, 0)

//   requestAnimationFrame(draw)
// }
// draw()
