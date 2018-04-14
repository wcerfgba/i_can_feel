//  from https://www.interactiveshaderformat.com/sketches/799
module.exports = `
/*{
  "CREDIT": "",
  "DESCRIPTION": "",
  "CATEGORIES": [
    "generator"
  ],
  "INPUTS": []
}*/

#ifdef GL_ES
precision highp float;
#endif
 
#define iterations 7
#define volsteps 7

float field(in vec3 p) 
{
	float strength = 7. + .03 * log(1.e-6 + fract(sin(TIME) * 4373.11));
	float accum = 0.;
	float prev = 0.;
	float tw = 0.;
	for (int i = 0; i < 7; ++i) 
	{
		float mag = dot(p, p);
		p = abs(p) / mag + vec3(-.5, -.4, -1.5);
		float w = exp(-float(i) / 7.);
		accum += w * exp(-strength * pow(abs(mag - prev), 2.3));
		tw += w;
		prev = mag;
	}
	return max(0., 5. * accum / tw - .7);
}

void main() {
	float res = 128.;
  float depth = 2.;
  float scale = pow(2., 14.);

  float t = TIME;

  vec2 uv = floor(isf_FragNormCoord * res);
  float n = pow(depth, 1. + (uv.x + (res * uv.y)) / scale);

  float v = mod(scale * depth * t / n, depth) / (depth - 1.);

  vec4 col = vec4(v, v, v, 1.);
  gl_FragColor = col;
}

`