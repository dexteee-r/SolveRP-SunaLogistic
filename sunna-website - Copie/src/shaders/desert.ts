// ============================================================
// GLSL SHADERS — Desert Scene
// Simplex noise + sand dune terrain + particles + post-process
// ============================================================

export const NOISE_GLSL = `
  vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec4 mod289(vec4 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g, l.zxy);
    vec3 i2 = max(g, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x2_ = x_ * ns.x + ns.yyyy;
    vec4 y2_ = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x2_) - abs(y2_);
    vec4 b0 = vec4(x2_.xy, y2_.xy);
    vec4 b1 = vec4(x2_.zw, y2_.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`

// ============================================================
// SHADER 1: SAND DUNE TERRAIN
// Smooth sine waves + subtle noise for clean, flowing dunes
// Scene lighting (ambient + directional + fog) handles shading
// ============================================================
export const duneVertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  varying vec2 vUv;
  varying float vElevation;

  void main(){
    vUv = uv;
    vec3 pos = position;
    float t = uTime;

    // ── Primary dune waves — smooth, flowing sine curves ──
    float w1 = sin(pos.x * 0.3 + t * 0.08) * 1.6;
    float w2 = cos(pos.y * 0.25 + t * 0.05) * 1.2;
    // Cross-wave for natural interference pattern
    float w3 = sin((pos.x + pos.y) * 0.18 + t * 0.06) * 0.8;

    // ── Secondary rolling dunes — longer wavelength ──
    float w4 = sin(pos.x * 0.12 - t * 0.03) * 2.0;
    float w5 = cos(pos.y * 0.1 + pos.x * 0.05 + t * 0.04) * 1.0;

    // ── Fine wind ripples — high-frequency subtle detail ──
    float ripple = sin(pos.x * 2.5 + pos.y * 1.8 + t * 0.15) * 0.08;
    ripple += cos(pos.x * 3.2 - pos.y * 2.0 + t * 0.12) * 0.05;

    float elevation = w1 + w2 + w3 + w4 + w5 + ripple;
    pos.z += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

export const duneFragmentShader = `
  varying vec2 vUv;
  varying float vElevation;

  void main(){
    // Sand color gradient — light on peaks, warm in valleys
    vec3 sandLight = vec3(0.95, 0.82, 0.58);
    vec3 sandWarm  = vec3(0.85, 0.65, 0.38);
    vec3 sandDeep  = vec3(0.72, 0.52, 0.30);

    // Blend based on UV height + elevation for natural gradient
    float t = vUv.y;
    vec3 base = mix(sandWarm, sandLight, t);

    // Elevation coloring — peaks catch more light
    float h = smoothstep(-3.0, 5.0, vElevation);
    base = mix(sandDeep, base, h * 0.6 + 0.4);

    // Subtle warm tint at distance (lower UV)
    base = mix(base, vec3(0.90, 0.75, 0.52), (1.0 - t) * 0.15);

    gl_FragColor = vec4(base, 1.0);
  }
`

// ============================================================
// SHADER 2: SAND PARTICLES (wind-driven)
// ============================================================
export const sandParticleVertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  attribute float aRandom;
  attribute float aScale;
  attribute float aSpeed;
  varying float vAlpha;
  varying float vColorMix;

  void main(){
    vec3 pos = position;

    // Wind-driven drift (left to right, slightly upward)
    float windPhase = uTime * aSpeed * 0.5 + aRandom * 100.0;
    pos.x += sin(windPhase) * 1.5 + uTime * aSpeed * 0.3;
    pos.y += cos(windPhase * 0.7) * 0.5;
    pos.z += sin(windPhase * 0.3 + aRandom * 6.28) * 0.8 + cos(uTime * 0.1 + aRandom * 3.14) * 0.5;

    // Wrap particles horizontally
    pos.x = mod(pos.x + 15.0, 30.0) - 15.0;

    // Scroll: particles rise and scatter
    pos.z += uScrollProgress * 3.0;
    pos.y += uScrollProgress * 1.0;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

    // Fade with distance and scroll
    vAlpha = smoothstep(15.0, 3.0, length(pos)) * (0.3 + aRandom * 0.5);
    vAlpha *= 1.0 - uScrollProgress * 0.5;

    // Color variation — some particles catch more light
    vColorMix = aRandom;

    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = aScale * (180.0 / -mvPos.z) * (1.0 + aRandom * 0.5);
  }
`

export const sandParticleFragmentShader = `
  varying float vAlpha;
  varying float vColorMix;

  void main(){
    float d = distance(gl_PointCoord, vec2(0.5));
    if(d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, d) * vAlpha;

    // Sand particle colors — warm golds to light tan
    vec3 colorA = vec3(0.83, 0.65, 0.46); // Sand
    vec3 colorB = vec3(0.95, 0.82, 0.55); // Golden
    vec3 color = mix(colorA, colorB, vColorMix);

    gl_FragColor = vec4(color, alpha);
  }
`

// ============================================================
// POST-PROCESSING: DESERT ATMOSPHERE
// ============================================================
export const desertPostFragmentShader = `
  uniform sampler2D tDiffuse;
  uniform float uTime;
  varying vec2 vUv;

  float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main(){
    vec2 uv = vUv;

    // Heat distortion — subtle wave near horizon (center of screen)
    float horizonDist = abs(uv.y - 0.45);
    float heatStrength = smoothstep(0.25, 0.0, horizonDist) * 0.003;
    uv.x += sin(uv.y * 40.0 + uTime * 2.0) * heatStrength;
    uv.y += cos(uv.x * 30.0 + uTime * 1.5) * heatStrength * 0.5;

    // Chromatic aberration — subtle, warm shift
    vec2 dir = uv - vec2(0.5);
    float dist = length(dir);
    float caOffset = 0.001 * dist;
    float r = texture2D(tDiffuse, uv + dir * caOffset).r;
    float g = texture2D(tDiffuse, uv).g;
    float b = texture2D(tDiffuse, uv - dir * caOffset * 0.5).b;
    vec3 color = vec3(r, g, b);

    // Warm color grading — push toward golden
    color.r *= 1.05;
    color.g *= 1.02;
    color.b *= 0.92;

    // Film grain — subtle desert grit
    float grain = rand(uv + fract(uTime * 0.5)) * 0.04;
    color += grain - 0.02;

    // Vignette — warm desert edges
    float vig = 1.0 - dist * 0.7;
    vig = smoothstep(0.15, 1.0, vig);
    color *= vig;

    gl_FragColor = vec4(color, 1.0);
  }
`

export const postVertexShader = `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
