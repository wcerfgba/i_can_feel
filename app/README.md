Interactive Shader Format example
=========================

This is a tutorial about how to start using Interactive Shader Format inside glitch projects. If you just want to set up your own hosted ISF Sketch, you can just remix this final project and modify isf-sketch.js with your ISF file.  If you want to learn a bit more about how to use glitch and the ISF Javascript library, follow along!

# ISF On Glitch

Start with r[require-starter-kit](https://glitch.com/edit/#!/require-starter-kit?path=README.md:1:0).  This is a little bit of boilerplate code that lets us include modules and bundle them to run in a browser.

Remix it!  In the top left corner where it says require-starter-kit, you can click it and there is a remix button.  This will create your own fork so you can do whatever you want with it.  

### Add the interactive-shader-format package
In `package.json` you can either manually add the dependency if you need a specific version, but more likely click Add Package at the top and add the interactive-shader-format package.  If you are still using v1 sketches, there is a v1 package for that.

### Modify the html
Since we just want to render a full screen sketch, we can replace all the html body content with a single canvas
	
		<canvas id="isf-canvas"></canvas>
	

### Start writing the script!

In `index.js` we need to include the interactive-shader-format package.
		
		const ISF = require(‘interactive-shader-format’)

Lets get a handle to the canvas so we can use it, and make it full screen

		const canvas = document.querySelector('#isf-canvas')
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

We can check out the documentation on the [ interactive-shader-format github page](https://github.com/msfeldstein/interactive-shader-format-js) to see how to start using it.

		const gl = canvas.getContext("webgl");
		const renderer = new ISFRenderer(gl);

Now we need a sketch to actually load into the renderer.  You can find lots of examples at interactiveshaderformat.com.  I'm going to borrow [vjzef's sketch 'cosplay'](https://www.interactiveshaderformat.com/sketches/802)

In order to use the ISF code in javascript we'll need to wrap it in a javascript package.  There are ways to load contents of files, but for simplicity, we are going to make it one big string.  Create a file called [`js/isf-sketch.js`](https://glitch.com/edit/#!/isf-example?path=js/isf-sketch.js:1:0) and have it export one big multiline string.  In javascript you can use back-ticks (`) to create multiline strings.

		module.exports = `
		/* {
			
		}*/
		void main() {
			...
		}
		`

### Load the sketch into the renderer

		const isfFragment = require('./isf-sketch')
		renderer.loadSource(isfFragment);
		renderer.draw(canvas);
		
You should see the first frame!

### Make it loop

We can set up a simple animation loop using requestAnimationFrame.  This hooks into the draw loop of the browser for better performance than writing setIntervals, and will also pause when the tab is hidden to save battery and cpu.

	const animate = () => {
	  requestAnimationFrame(animate)
	  renderer.draw(canvas);
	}
	animate()

Voila you have an animating ISF Sketch in glitch.

### Change parameters
The beauty of ISF is in its input parameters.  You can see all the parameters you can edit in the interactiveshaderformat.com viewer, but you can also set them in javascript.

		renderer.setValue("dotSize", .05)

If you want to add some controls to tweak the sketch, i recommend using dat-gui or the [controlkit](https://www.npmjs.com/package/controlkit) package.  We'll use controlkit.
		
		const ControlKit = require('controlkit')
		
		// Basic setup
		ControlKit.setup()
		const controlKitPanel = ControlKit.addPanel()
		
		// Create an object to hold any parameter values we want to modify
		const params = { 
		  dotSize: { value: 0.01, range: [0.001, 0.1] }
		}
		// Add a slider for each property, and a callback to change the property in the renderer
		controlKitPanel.addSlider(
		  params.dotSize, // Object to update
		  'value', 'range', // key for value and range
		  { // options
		    label: 'dotSize',
		    onChange: function(v) {
		      renderer.setValue("dotSize", params.dotSize.value)
		    }
		  }
		)