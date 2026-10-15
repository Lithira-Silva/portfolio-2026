import * as THREE from "three";

/**
 * Procedural koi. One BufferGeometry holds body, pectoral fins and tail.
 * Every vertex carries `aSpine` (0 nose → 1 tail tip) so the vertex shader can
 * bend the whole fish with one travelling wave.
 *
 * Local space: the fish points along +x, nose at x = 0.5, tail tip near x = -0.62.
 */

export const VARIETIES = ["kohaku", "sanke", "showa", "tancho", "ogon", "asagi", "chagoi"] as const;
export type Variety = (typeof VARIETIES)[number];

const BODY_END = 0.86;

/** Half-width of the body at spine position t (0..BODY_END). */
function radius(t: number) {
  const head = Math.sqrt(Math.min(t / 0.09, 1)); // rounded nose
  const taper = Math.pow(1 - t / (BODY_END + 0.06), 0.85);
  return 0.135 * head * taper * (1 + 0.25 * Math.sin(Math.PI * Math.min(t / 0.6, 1)));
}

export function createKoiGeometry() {
  const positions: number[] = [];
  const normals: number[] = [];
  const spine: number[] = [];
  const part: number[] = [];
  const fin: number[] = [];
  const indices: number[] = [];

  const push = (x: number, y: number, z: number, nx: number, ny: number, nz: number, s: number, p: number, f: number) => {
    positions.push(x, y, z);
    normals.push(nx, ny, nz);
    spine.push(s);
    part.push(p);
    fin.push(f);
    return positions.length / 3 - 1;
  };

  // Body: rings along the spine.
  const RINGS = 40;
  const SEG = 18;
  const bodyStart = 0;
  for (let i = 0; i <= RINGS; i++) {
    const t = (i / RINGS) * BODY_END;
    const r = Math.max(radius(t), 0.002);
    for (let j = 0; j <= SEG; j++) {
      const a = (j / SEG) * Math.PI * 2;
      const sy = Math.sin(a);
      const flat = sy < 0 ? 0.55 : 0.78; // flatter belly
      push(0.5 - t, sy * r * flat, Math.cos(a) * r, 0, sy, Math.cos(a), t, 0, 0);
    }
  }
  for (let i = 0; i < RINGS; i++) {
    for (let j = 0; j < SEG; j++) {
      const a = bodyStart + i * (SEG + 1) + j;
      const b = a + SEG + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  // Flat fin helper: grid of u (root→edge) × v (-1..1).
  const finGrid = (
    U: number,
    V: number,
    at: (u: number, v: number) => [number, number, number, number],
    p: number,
  ) => {
    const start = positions.length / 3;
    for (let i = 0; i <= U; i++) {
      for (let j = 0; j <= V; j++) {
        const u = i / U;
        const v = (j / V) * 2 - 1;
        const [x, y, z, s] = at(u, v);
        push(x, y, z, 0, 1, 0, s, p, u);
      }
    }
    for (let i = 0; i < U; i++) {
      for (let j = 0; j < V; j++) {
        const a = start + i * (V + 1) + j;
        const b = a + V + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  };

  // Tail: butterfly fan with a soft notch in the middle.
  finGrid(10, 12, (u, v) => {
    const len = 0.3 * u * (0.62 + 0.38 * Math.pow(Math.abs(v), 0.8));
    const s = BODY_END - 0.02 + len;
    const half = 0.022 + 0.19 * Math.pow(u, 1.1);
    return [0.5 - s, 0.005, v * half, s];
  }, 1);

  // Pectoral fins, both sides: rounded paddles sweeping back.
  for (const side of [1, -1]) {
    const t0 = 0.26;
    const r0 = radius(t0) * 0.85;
    finGrid(8, 6, (u, v) => {
      const out = r0 + 0.17 * u;
      const sweep = 0.07 * u + (v * 0.5 + 0.5) * (0.035 + 0.06 * Math.sin(Math.PI * Math.min(u * 1.1, 1)));
      const s = t0 + sweep;
      return [0.5 - s, -0.03, side * out, s];
    }, 2);
  }

  // Dorsal fin: a low translucent sail along the back.
  finGrid(4, 14, (u, v) => {
    const s = 0.3 + (v * 0.5 + 0.5) * 0.36;
    const sail = Math.sin(Math.PI * (v * 0.5 + 0.5)) * 0.06;
    return [0.5 - s, radius(s) * 0.78 + sail * u, 0, s];
  }, 3);

  // Pelvic fins: smaller, further back.
  for (const side of [1, -1]) {
    const t0 = 0.5;
    const r0 = radius(t0) * 0.7;
    finGrid(5, 4, (u, v) => {
      const out = r0 + 0.08 * u;
      const s = t0 + 0.04 * u + (v * 0.5 + 0.5) * 0.04;
      return [0.5 - s, -0.035, side * out, s];
    }, 2);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  g.setAttribute("aSpine", new THREE.Float32BufferAttribute(spine, 1));
  g.setAttribute("aPart", new THREE.Float32BufferAttribute(part, 1));
  g.setAttribute("aFin", new THREE.Float32BufferAttribute(fin, 1));
  g.setIndex(indices);
  g.computeBoundingSphere();
  return g;
}

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSwim;
  uniform float uPhase;
  uniform float uTurn;
  uniform float uAmp;
  attribute float aSpine;
  attribute float aPart;
  attribute float aFin;
  varying vec2 vPat;
  varying float vPart;
  varying float vFin;
  varying float vSpine;
  varying vec3 vN;
  varying vec3 vView;

  void main() {
    vec3 p = position;
    vPat = p.xz;
    vPart = aPart;
    vFin = aFin;
    vSpine = aSpine;
    float t = aSpine;

    // Pectoral and pelvic fins paddle.
    if (aPart > 1.5 && aPart < 2.5) {
      float flap = sin(uTime * 2.2 + uPhase * 3.0);
      p.y += flap * 0.05 * aFin;
      p.x -= (flap * 0.5 + 0.5) * 0.04 * aFin;
    }

    // Travelling wave: head nearly still, tail sweeps.
    float wave = sin(t * 6.0 - uSwim + uPhase);
    float amp = uAmp * (0.04 + pow(t, 1.8));
    p.z += wave * amp;
    // Turning bends the fish into an arc.
    p.z += uTurn * t * t * 0.45;
    // Tail fin ripples on its own.
    if (aPart > 0.5 && aPart < 1.5) {
      p.y += sin(uSwim * 1.3 + p.z * 18.0) * 0.012 * aFin;
    }

    vN = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform float uVariety;
  uniform float uSeed;
  uniform float uShadow;
  uniform float uDim;
  varying vec2 vPat;
  varying float vPart;
  varying float vFin;
  varying float vSpine;
  varying vec3 vN;
  varying vec3 vView;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    if (uShadow > 0.5) {
      gl_FragColor = vec4(0.02, 0.06, 0.07, vPart > 0.5 ? 0.14 : 0.3);
      return;
    }

    vec3 white = vec3(0.97, 0.95, 0.91);
    vec3 red = vec3(0.89, 0.29, 0.12);
    vec3 black = vec3(0.06, 0.07, 0.08);
    vec3 gold = vec3(0.98, 0.72, 0.28);
    vec3 blue = vec3(0.47, 0.57, 0.64);
    vec3 brown = vec3(0.55, 0.38, 0.22);

    vec2 q = vPat * vec2(5.5, 9.0) + uSeed * 17.0;
    float n = fbm(q);
    float n2 = fbm(q * 1.7 + 9.3);
    float edge = abs(vPat.y) / 0.14; // 0 on the back ridge, 1 at the flanks

    vec3 col = white;
    int v = int(uVariety + 0.5);
    if (v == 0) {            // kohaku: white with red patches
      col = mix(white, red, smoothstep(0.47, 0.52, n));
    } else if (v == 1) {     // sanke: kohaku + small black spots
      col = mix(white, red, smoothstep(0.5, 0.55, n));
      col = mix(col, black, smoothstep(0.66, 0.69, n2));
    } else if (v == 2) {     // showa: black base, red and white
      col = mix(black, red, smoothstep(0.45, 0.5, n));
      col = mix(col, white, smoothstep(0.58, 0.62, n2));
    } else if (v == 3) {     // tancho: white with one red circle on the head
      float d = length((vPat - vec2(0.36, 0.0)) * vec2(1.0, 1.25));
      col = mix(red, white, smoothstep(0.055, 0.065, d));
    } else if (v == 4) {     // ogon: metallic gold
      col = gold * (0.85 + 0.3 * n);
    } else if (v == 5) {     // asagi: blue net back, orange flanks
      col = mix(blue, red * 1.05, smoothstep(0.55, 0.95, edge));
    } else {                 // chagoi: bronze
      col = brown * (0.9 + 0.25 * n);
    }

    // Scale net on the body.
    if (vPart < 0.5) {
      vec2 s = vPat * vec2(70.0, 90.0);
      float net = abs(sin(s.x + s.y) * sin(s.x - s.y));
      col *= 0.93 + 0.07 * net;
      // Eyes.
      vec2 e = vec2(vPat.x - 0.445, abs(vPat.y) - 0.052);
      col = mix(col, vec3(0.05), 1.0 - smoothstep(0.010, 0.014, length(e)));
    }

    // Moonlight from above (view space: the camera looks straight down).
    vec3 N = normalize(vN);
    vec3 V = normalize(vView);
    vec3 L = normalize(vec3(0.3, -0.35, 1.0));
    float light = 0.42 + 0.5 * max(dot(N, L), 0.0);
    float spec = pow(max(dot(N, normalize(L + V)), 0.0), 48.0) * (v == 4 ? 0.9 : 0.4);
    float rim = pow(1.0 - max(dot(N, V), 0.0), 2.5);

    float alpha = 1.0;
    if (vPart > 0.5) {
      // Fins: translucent, with rays.
      float rays = 0.94 + 0.06 * sin(vPat.y * 90.0 + vPat.x * 30.0);
      col = mix(col, white, 0.3) * rays;
      alpha = (0.7 - 0.45 * vFin);
      light = 0.85;
      spec = 0.0;
      rim = 0.0;
    }

    vec3 water = vec3(0.03, 0.09, 0.11);
    col = col * light + vec3(1.0, 0.96, 0.9) * spec + vec3(0.35, 0.85, 0.8) * rim * 0.28;
    col = mix(col, water, uDim);
    gl_FragColor = vec4(col, alpha);
  }
`;

export interface KoiUniforms {
  [key: string]: THREE.IUniform;
  uTime: THREE.IUniform<number>;
  uSwim: THREE.IUniform<number>;
  uPhase: THREE.IUniform<number>;
  uTurn: THREE.IUniform<number>;
  uAmp: THREE.IUniform<number>;
  uVariety: THREE.IUniform<number>;
  uSeed: THREE.IUniform<number>;
  uShadow: THREE.IUniform<number>;
  uDim: THREE.IUniform<number>;
}

export function createKoiMaterials(variety: number, seed: number) {
  const uniforms: KoiUniforms = {
    uTime: { value: 0 },
    uSwim: { value: 0 },
    uPhase: { value: seed * 6.28 },
    uTurn: { value: 0 },
    uAmp: { value: 0.07 },
    uVariety: { value: variety },
    uSeed: { value: seed },
    uShadow: { value: 0 },
    uDim: { value: 0.12 },
  };
  const body = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const shadow = new THREE.ShaderMaterial({
    uniforms: { ...uniforms, uShadow: { value: 1 } },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  return { uniforms, body, shadow };
}
