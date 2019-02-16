import React from 'react';
import GL from 'gl-react';

const shaders = GL.Shaders.create({
  amaro: {
    frag:
    `
    precision highp float;
    varying vec2 uv;
    uniform sampler2D image;
    uniform float factor;

    void main () {
      vec4 c = texture2D(image, uv);
      // Algorithm from Chapter 16 of OpenGL Shading Language
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), c.rgb, factor), c.a);
    }
    `
  }
});

export const Saturation = GL.createComponent(
  ({ children, factor }) =>
    <GL.Node shader={shaders.amaro} uniforms={{ factor }}>
      <GL.Uniform name="image">{children}</GL.Uniform>
    </GL.Node>
);
