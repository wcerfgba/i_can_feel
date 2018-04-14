//  from https://www.interactiveshaderformat.com/sketches/799
module.exports = `
/*{
  "CREDIT": "",
  "DESCRIPTION": "",
  "CATEGORIES": [],
  "INPUTS": []
}*/

#ifdef GL_ES
precision highp float;
#endif

void main() {
  float phi = 1.6180339887;

  float X = 64.;
  float T = 10.;
  
  float t = TIME / T;
  float i = ((floor(X * isf_FragNormCoord.x) +
              floor(X * isf_FragNormCoord.y) * X)) / ((X * X) + X);

  float m = i;

  float c = mod(t, m);

  vec4 col = vec4(c, c, c, 1.);
  gl_FragColor = col;
}

`