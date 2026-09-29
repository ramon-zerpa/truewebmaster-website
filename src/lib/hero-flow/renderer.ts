import type { FlowConfig } from "./config";
import { vertexShader, fragmentShader } from "./shaders";

type Pointer = { x: number; y: number; intensity: number };
type Renderer = {
  draw: (time: number, pointer: Pointer) => void;
  resize: () => void;
  destroy: () => void;
};
const rgb = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

function webgl(canvas: HTMLCanvasElement, c: FlowConfig): Renderer | null {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl) return null;
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  if (!program || !buffer) return null;
  const shaders: WebGLShader[] = [];
  const destroy = () => {
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    shaders.forEach((s) => gl.deleteShader(s));
  };
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vertexShader],
    [gl.FRAGMENT_SHADER, fragmentShader],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) {
      destroy();
      return null;
    }
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      destroy();
      return null;
    }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    destroy();
    return null;
  }
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uniform = (name: string) => gl.getUniformLocation(program, `u_${name}`);
  const timeLoc = uniform("time"),
    pointerLoc = uniform("pointer"),
    resolutionLoc = uniform("resolution");
  const values = {
    warp: c.warpStrength,
    softness: c.bandSoftness,
    contrast: c.contrast,
    highlight: c.highlightIntensity,
    pointerStrength: c.pointerStrength,
    pointerRadius: c.pointerRadius,
    edge: c.edgeDepth,
    calm: c.calmZoneStrength,
    grain: c.grainAmount,
    scale: c.animationScale,
  };
  Object.entries(values).forEach(([key, value]) =>
    gl.uniform1f(uniform(key), value),
  );
  const colors = {
    base: c.palette.base,
    shadow: c.palette.shadow,
    teal: c.palette.teal,
    cyan: c.palette.cyan,
    light: c.palette.highlight,
  };
  Object.entries(colors).forEach(([key, value]) => {
    const v = rgb(value);
    gl.uniform3f(uniform(key), v[0], v[1], v[2]);
  });
  return {
    resize: () => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
    },
    draw: (time, p) => {
      gl.uniform1f(timeLoc, time * c.speed);
      gl.uniform3f(pointerLoc, p.x, p.y, p.intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destroy,
  };
}

/** Filled directional ribbons, not a particle swarm or line-wave replacement. */
function canvas2d(canvas: HTMLCanvasElement, c: FlowConfig): Renderer | null {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return null;
  const samples = 48,
    ribbons = 7;
  const points = new Float32Array((samples + 1) * 2);
  const rgbBase = rgb(c.palette.base);
  const colors = [
    c.palette.shadow,
    c.palette.teal,
    c.palette.cyan,
    c.palette.highlight,
    c.palette.teal,
    c.palette.shadow,
  ].map(rgb);
  const stops = [0, 0.35, 0.48, 0.56, 0.72, 1];
  const slices = 16;
  const shades = Array.from({ length: slices }, (_, i) => {
    const f = (i + 0.5) / slices;
    let j = 0;
    while (j < stops.length - 2 && f > stops[j + 1]) j++;
    const blend = (f - stops[j]) / (stops[j + 1] - stops[j]);
    return `rgb(${colors[j].map((v, k) => Math.round((v + (colors[j + 1][k] - v) * blend) * 255)).join(",")})`;
  });
  const stroke = (t: number, i: number, x: number, p: Pointer) => {
    const shift =
      Math.exp(-Math.pow((x - p.x) / Math.max(0.01, c.pointerRadius), 2)) *
      p.intensity *
      c.pointerStrength;
    return (
      0.09 +
      i * 0.135 -
      x * 0.38 +
      Math.sin(x * 5 * c.animationScale + i * 0.58 - t * 0.29) *
        0.14 *
        c.warpStrength +
      Math.sin(x * 8.2 + i * 0.31 + t * 0.19) * 0.055 * c.warpStrength +
      shift
    );
  };
  return {
    resize: () => {},
    destroy: () => {},
    draw: (seconds, p) => {
      const w = canvas.width,
        h = canvas.height,
        t = seconds * c.speed;
      ctx.fillStyle = c.palette.base;
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < ribbons; i++) {
        const thick = h * (0.07 + c.bandSoftness * 0.065);
        for (let s = 0; s <= samples; s++) {
          const x = s / samples;
          points[s * 2] = x * w;
          points[s * 2 + 1] = stroke(t, i, x, p) * h;
        }
        ctx.globalAlpha = Math.min(
          1,
          (0.26 + c.highlightIntensity * 0.32) * c.contrast,
        );
        // Light follows the ribbon's normal, rather than a screen-space gradient.
        // Precomputed material colors and one reusable coordinate buffer.
        for (let j = 0; j < slices; j++) {
          const a = j / slices,
            b = (j + 1.04) / slices;
          ctx.beginPath();
          for (let s = 0; s <= samples; s++) {
            const y =
              points[s * 2 + 1] +
              thick * (0.55 + 0.45 * Math.sin((s / samples) * 3 + i)) * a;
            if (s === 0) ctx.moveTo(points[s * 2], y);
            else ctx.lineTo(points[s * 2], y);
          }
          for (let s = samples; s >= 0; s--)
            ctx.lineTo(
              points[s * 2],
              points[s * 2 + 1] +
                thick * (0.55 + 0.45 * Math.sin((s / samples) * 3 + i)) * b,
            );
          ctx.closePath();
          ctx.fillStyle = shades[j];
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      const calm = ctx.createLinearGradient(0, 0, w, 0);
      const color = rgbBase.map((v) => Math.round(v * 255)).join(",");
      calm.addColorStop(
        0,
        `rgba(${color},${Math.min(1, 0.45 + c.calmZoneStrength * 0.55)})`,
      );
      calm.addColorStop(0.5, `rgba(${color},${c.calmZoneStrength * 0.62})`);
      calm.addColorStop(1, `rgba(${color},.08)`);
      ctx.fillStyle = calm;
      ctx.fillRect(0, 0, w, h);
    },
  };
}

export function mountHeroFlow(root: HTMLElement) {
  const config: FlowConfig = JSON.parse(root.dataset.flowConfig!);
  const hero = root.parentElement!;
  let canvas = root.querySelector<HTMLCanvasElement>("canvas")!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = matchMedia("(pointer: coarse)");
  const device = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const lowBudget =
    !!device.connection?.saveData ||
    (device.deviceMemory !== undefined && device.deviceMemory <= 2);
  let renderer: Renderer | null = null,
    kind = "static",
    visible = true,
    dead = false,
    raf = 0,
    time = 0,
    last = 0;
  let drawAt = 0,
    slow = 0,
    quality = 1,
    frames = 0;
  let fps = lowBudget
    ? config.fallbackFps
    : coarse.matches
      ? config.mobileFps
      : config.fps;
  const pointer: Pointer = { x: 0.75, y: 0.3, intensity: 0 },
    target: Pointer = { ...pointer };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
    root.removeAttribute("data-running");
  };
  const resize = () => {
    const rect = root.getBoundingClientRect();
    const limit = (kind === "canvas2d" ? 360_000 : config.maxPixels) * quality;
    const dpr = Math.min(
      devicePixelRatio || 1,
      config.maxDpr,
      Math.sqrt(limit / Math.max(1, rect.width * rect.height)),
    );
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    renderer?.resize();
    renderer?.draw(time, pointer);
  };
  const replaceCanvas = () => {
    // Preserve Astro's scoped style attributes when changing context type.
    const replacement = canvas.cloneNode(false) as HTMLCanvasElement;
    canvas.replaceWith(replacement);
    canvas = replacement;
  };
  const fallback = () => {
    renderer?.destroy();
    replaceCanvas();
    renderer = canvas2d(canvas, config);
    kind = renderer ? "canvas2d" : "static";
    fps = config.fallbackFps;
    root.dataset.renderer = kind;
    if (renderer) {
      resize();
      root.setAttribute("data-ready", "");
    } else {
      stop();
      root.removeAttribute("data-ready");
    }
  };
  if (!lowBudget) {
    try {
      renderer = webgl(canvas, config);
    } catch {
      renderer = null;
    }
  }
  if (renderer) {
    kind = "webgl";
    root.dataset.renderer = kind;
    resize();
    root.setAttribute("data-ready", "");
    canvas.addEventListener(
      "webglcontextlost",
      (e) => {
        e.preventDefault();
        stop();
        fallback();
        update();
      },
      { once: true },
    );
  } else fallback();
  const frame = (now: number) => {
    if (dead || !renderer) return;
    const delta = last ? Math.min((now - last) / 1000, 0.12) : 0;
    last = now;
    time += delta;
    const blend = 1 - Math.exp(-delta * 3.5);
    pointer.x += (target.x - pointer.x) * blend;
    pointer.y += (target.y - pointer.y) * blend;
    pointer.intensity += (target.intensity - pointer.intensity) * blend;
    if (now - drawAt >= 1000 / fps - 1) {
      const interval = now - drawAt;
      drawAt = now;
      renderer.draw(time, pointer);
      frames++;
      // Respond to sustained missed frame budgets; no synchronous GPU readbacks.
      if (interval > (1000 / fps) * 1.8 && frames > 10) slow++;
      else slow = Math.max(0, slow - 1);
      if (slow > 18) {
        slow = 0;
        if (quality === 1) {
          quality = 0.6;
          fps = Math.min(fps, 24);
          resize();
        } else if (kind === "webgl") {
          fallback();
        } else {
          fps = 12;
          quality = 0.45;
          resize();
        }
      }
    }
    raf = requestAnimationFrame(frame);
  };
  function update() {
    const run =
      !dead && !!renderer && visible && !document.hidden && !reduced.matches;
    if (run && !raf) {
      last = 0;
      drawAt = performance.now();
      root.setAttribute("data-running", "");
      raf = requestAnimationFrame(frame);
    } else if (!run) stop();
  }
  const move = (e: PointerEvent) => {
    if (coarse.matches || reduced.matches) return;
    const rect = hero.getBoundingClientRect();
    target.x = (e.clientX - rect.left) / rect.width;
    target.y = (e.clientY - rect.top) / rect.height;
    target.intensity = 1;
  };
  const leave = () => {
    target.intensity = 0;
  };
  hero.addEventListener("pointermove", move, { passive: true });
  hero.addEventListener("pointerleave", leave);
  reduced.addEventListener("change", update);
  document.addEventListener("visibilitychange", update);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  });
  observer.observe(hero);
  const resizing = new ResizeObserver(resize);
  resizing.observe(root);
  const destroy = () => {
    dead = true;
    stop();
    observer.disconnect();
    resizing.disconnect();
    renderer?.destroy();
    hero.removeEventListener("pointermove", move);
    hero.removeEventListener("pointerleave", leave);
    reduced.removeEventListener("change", update);
    document.removeEventListener("visibilitychange", update);
  };
  window.addEventListener("pagehide", (e) => {
    if (e.persisted) stop();
    else destroy();
  });
  window.addEventListener("pageshow", update);
  update();
}
