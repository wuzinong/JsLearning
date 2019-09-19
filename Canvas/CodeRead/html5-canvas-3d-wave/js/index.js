"use strict";

// Do you like rainbow waves?
var rainbow = false;

// Need more performance?
var HD = true;

var canvas = document.querySelector("canvas");
var background = document.querySelector(".background");
var bar = document.querySelector(".progress");

var initialize = function initialize(vertices) {
  var pixelRatio = HD ? window.devicePixelRatio : 1;
  var rows = HD ? 150 : 100;
  var multiplier = rows * rows;
  var duration = 0.4;
  var geometry = [{ x: 0, y: 0, z: 0 }];
  var pointSize = (HD ? 6 : 2).toFixed(1);

  var step = 0.004;
  var size = 5;
  var attributes = [{
    name: "aPositionStart",
    data: function data(i, total) {
      return [size - (i % rows / rows + 0.5 / rows) * (size * 2), -1, (size - (Math.floor(i / rows) / rows + 0.5 / rows) * size * 2) * -1];
    }
  }, {
    name: "aControlPointOne",
    data: function data(i) {
      return [size - (i % rows / rows + 0.5 / rows) * (size * 2), -0.5 + getRandom(0.2), (size - (Math.floor(i / rows) / rows + 0.5 / rows) * size * 2) * -1];
    }
  }, {
    name: "aControlPointTwo",
    data: function data(i) {
      return [size - (i % rows / rows + 0.5 / rows) * (size * 2), -0.5 + getRandom(0.2), (size - (Math.floor(i / rows) / rows + 0.5 / rows) * size * 2) * -1];
    }
  }, {
    name: "aPositionEnd",
    data: function data(i) {
      return [size - (i % rows / rows + 0.5 / rows) * (size * 2), -1, (size - (Math.floor(i / rows) / rows + 0.5 / rows) * size * 2) * -1];
    }
  }, {
    name: "aOffset",
    data: function data(i) {
      return [i * ((1 - duration) / (multiplier - 1))];
    }
  }, {
    name: "aColor",
    data: function data(i, total) {
      return getHSL(rainbow ? i / total * 1.0 : 0.5 + i / total * 0.4, 0.5, 0.5);
    }
  }];

  var uniforms = [{
    name: "uProgress",
    type: "float",
    value: 0.8
  }];

  var vertexShader = "\n  attribute vec3 aPositionStart;\n  attribute vec3 aControlPointOne;\n  attribute vec3 aControlPointTwo;\n  attribute vec3 aPositionEnd;\n  attribute float aOffset;\n  attribute vec3 aColor;\n\n  uniform float uProgress;\n  uniform mat4 uMVP;\n\n  varying vec3 vColor;\n\n  vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {\n    return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);\n  }\n\n  float easeInOutQuint(float t){\n    return t < 0.5 ? 16.0 * t * t * t * t * t : 1.0 + 16.0 * (--t) * t * t * t * t;\n  }\n\n  void main () {\n    float tProgress = easeInOutQuint(min(1.0, max(0.0, (uProgress - aOffset)) / " + duration + "));\n    vec3 newPosition = bezier4(aPositionStart, aControlPointOne, aControlPointTwo, aPositionEnd, tProgress);\n    gl_PointSize = " + pointSize + " + ((newPosition.y + 1.0) * 80.0);\n    gl_Position = uMVP * vec4(newPosition, 1.0);\n    vColor = aColor;\n  }\n";

  var fragmentShader = "\n  precision mediump float;\n\n  varying vec3 vColor;\n\n  void main() {\n     vec2 pc = 2.0 * gl_PointCoord - 1.0;\n     gl_FragColor = vec4(vColor, 1.0 - dot(pc, pc));\n  }\n";

  var onSetup = function onSetup(gl) {
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.enable(gl.BLEND);
  };

  var onRepeat = function onRepeat() {
    rotateY(uniforms[uniforms.length - 1].value, 0.002);
    if (uniforms[0].value < 0) {
      uniforms[0].value = 1;
    }
    uniforms[0].value -= step;
  };

  // const diff = (a, b) => Math.abs(a - b);

  // const ratio = window.innerWidth / window.innerHeight;
  // const halfWidth = window.innerWidth / 2;
  // const halfHeight = window.innerHeight / 2;
  // window.addEventListener('mousemove', (e) => {
  //   uniforms[0].value = (((e.clientX - halfWidth) / halfWidth) * ratio).toFixed(4);
  //   uniforms[1].value = (((e.clientY - halfHeight) / halfHeight)).toFixed(4) * -1;
  // });

  var options = {
    onSetup: onSetup,
    onRepeat: onRepeat,
    pixelRatio: pixelRatio
  };

  starlings(canvas, geometry, multiplier, attributes, uniforms, vertexShader, fragmentShader, options);
};

var getRandom = function getRandom(value) {
  return Math.random() * value - value / 2;
};

var rotateY = function rotateY(matrix, angle) {
  var sin = Math.sin(angle);
  var cos = Math.cos(angle);
  var clone = JSON.parse(JSON.stringify(matrix));

  matrix[0] = clone[0] * cos - clone[8] * sin;
  matrix[1] = clone[1] * cos - clone[9] * sin;
  matrix[2] = clone[2] * cos - clone[10] * sin;
  matrix[3] = clone[3] * cos - clone[11] * sin;
  matrix[8] = clone[0] * sin + clone[8] * cos;
  matrix[9] = clone[1] * sin + clone[9] * cos;
  matrix[10] = clone[2] * sin + clone[10] * cos;
  matrix[11] = clone[3] * sin + clone[11] * cos;
};

var h2r = function h2r(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
  return p;
};

var getHSL = function getHSL(h, s, l) {
  h = (h % 1 + 1) % 1;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  if (s === 0) return [l, l, l];
  var p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
  var q = 2 * l - p;
  return [h2r(q, p, h + 1 / 3), h2r(q, p, h), h2r(q, p, h - 1 / 3)];
};

initialize();