export const vertexShader = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * .5 + .5;
  gl_Position = vec4(a_position, 0., 1.);
}`;

export const fragmentShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec3 u_pointer;
uniform float u_time, u_warp, u_softness, u_contrast, u_highlight;
uniform float u_pointerStrength, u_pointerRadius, u_edge, u_calm, u_grain, u_scale;
uniform vec3 u_base, u_shadow, u_teal, u_cyan, u_light;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * .1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),
             mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);
}
void main() {
  vec2 uv = vec2(v_uv.x, 1.-v_uv.y);
  float aspect = u_resolution.x / max(u_resolution.y,1.);
  vec2 p = vec2(uv.x*max(aspect,.85),uv.y) * u_scale;
  float t = u_time;
  vec2 drift = vec2(t*.17,-t*.11);
  vec2 domain = vec2(noise(p*1.7+drift),noise(p*1.7-drift+7.4))-.5;
  vec2 q = p + domain*u_warp;
  q += (vec2(noise(q*2.1+3.2-drift*.6),noise(q*2.1+9.1+drift*.4))-.5)*u_warp*.34;
  vec2 delta = uv-u_pointer.xy;
  float local = exp(-dot(delta,delta)/max(.005,u_pointerRadius*u_pointerRadius));
  q.y += local*u_pointer.z*u_pointerStrength*(delta.x+.18);
  // Broad asymmetric folds: soft fabric body, a narrow satin crest, recessed trough.
  float field = q.y*4.9 - q.x*1.85 + sin(q.x*2.3+t*.19)*.7 + t*.23;
  float cycle = .5+.5*sin(field*6.28318);
  float body = pow(cycle,1.7+u_softness*2.);
  float crest = pow(cycle,12.+(1.-u_softness)*24.);
  float trough = pow(1.-cycle,3.);
  float sheen = .5+.5*sin(q.x*2.1-q.y*.8-t*.35);
  float upper = smoothstep(.12,.95,uv.x);
  float calm = 1.-u_calm*(1.-smoothstep(.25,.88,uv.x))*(1.-smoothstep(.45,.82,uv.y));
  float edges = smoothstep(.28,.95,length((uv-vec2(.48,.42))*vec2(.95,1.1)));
  float depth = mix(.72,1.05,edges*u_edge);
  float envelope = (.2+.8*upper)*calm*depth;
  vec3 fabric = mix(u_shadow,u_teal,body*.68);
  fabric = mix(fabric,u_cyan,body*sheen*.38);
  fabric += (u_light-u_teal)*crest*u_highlight*(.28+.72*sheen);
  fabric *= 1.-trough*.28;
  vec3 color = mix(u_base,fabric,clamp(envelope*u_contrast,0.,1.));
  color += (hash(gl_FragCoord.xy)-.5)*u_grain;
  gl_FragColor = vec4(max(color,vec3(0.)),1.);
}`;
