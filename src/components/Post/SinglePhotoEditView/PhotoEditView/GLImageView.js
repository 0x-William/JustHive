import GL from 'gl-react';
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
const shaders = GL.Shaders.create({
  image: {
    vert: `
precision highp float;
attribute vec3 position;
varying vec2 uv;
uniform float u_vw;
uniform float u_vh;
uniform float u_s;
uniform float u_r;
uniform vec2 u_t;
void main() {
  float x0 = (1.0 + position.x) * u_vw / 2.0;
  float y0 = (1.0 - position.y) * u_vh / 2.0;
  x0 = x0 * u_s;
  y0 = y0 * u_s;
  x0 = x0 - u_vw * 0.5;
  y0 = y0 - u_vh * 0.5;
  float x1 = x0 * cos(u_r) - y0 * sin(u_r);
  float y1 = x0 * sin(u_r) + y0 * cos(u_r);
  x1 = x1 + u_vw * 0.5;
  y1 = y1 + u_vh * 0.5;
  float x = x1 + u_t.x;
  float y = y1 + u_t.y;
  x = x / u_vw * 2.0 - 1.0;
  y = 1.0 - y / u_vh * 2.0;
  gl_Position=vec4(x, y, 0.0, 1.0);
  uv = 0.5 * (position.xy + vec2(1.0, 1.0));
}
    `,
    frag: `
precision highp float;
varying vec2 uv;
uniform sampler2D t;
void main () {
  gl_FragColor = texture2D(t, uv) * step(0.0, 1.0-uv.x) * step(0.0, 1.0-uv.y);
}`
  }
});

export default GL.createComponent(
  ({
    source, rotate, translate, scale, width, height, children
  }) => (
    <GL.Node
      width={200}
      height={200}
      shader={shaders.image}
      uniforms={{
        t: source,
        u_r: rotate,
        u_t: translate,
        u_s: scale,
        u_vw: width,
        u_vh: height,
      }}
    />
  ),
  {
    displayName: 'GLImageView',
    propTypes: {
      source: PropTypes.any.isRequired,
      rotate: PropTypes.number.isRequired,
      translate: PropTypes.array.isRequired,
      scale: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      children: PropTypes.any
    }
  }
);
