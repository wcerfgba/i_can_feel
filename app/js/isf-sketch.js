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
  float X = 24.;
  float G = 5.75;
  float N = (X * X) / G;
  float t = 991677934871. * TIME;
  float x = ((floor(X * isf_FragNormCoord.x) +
              floor(X * isf_FragNormCoord.y) * X)) / ((X * X) + X);
  float n = floor(x * N) / N;
  float i = (1. / G) * mod(x * X * X, G);

  float gv = (1. / n) * mod(t, n);
  float cv = (1. / i) * mod(gv, i);

  vec4 col = vec4(cv, cv, cv, 1.);
  gl_FragColor = col;
}

// Some nice time formulae:
//
//  float t = 10308848.7745 * TIME;  //  
`