const ISFRenderer = require('interactive-shader-format').Renderer
const ControlKit = require('controlkit')

const canvas = document.querySelector('#isf-canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gl = canvas.getContext("webgl");
const renderer = new ISFRenderer(gl);

const isfFragment = require('./isf-sketch')
renderer.loadSource(isfFragment);
// renderer.setValue("dotSize", .05)

const animate = () => {
  requestAnimationFrame(animate)
  renderer.draw(canvas);
}
animate()

// ControlKit.setup()
// const controlKitPanel = ControlKit.addPanel()
// const params = { 
//   dotSize: { value: 0.75, range: [0.5, 1.0] }
// }
// controlKitPanel.addSlider(
//   params.dotSize, // Object to update
//   'value', 'range', // key for value and range
//   { // options
//     label: 'morph',
//     onChange: function(v) {
//       renderer.setValue("morph", params.dotSize.value)
//     }
//   }
// )