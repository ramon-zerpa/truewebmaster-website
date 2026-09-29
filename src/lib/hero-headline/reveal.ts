import type { heroHeadlineConfig } from "./config";

/** The original H1 is never split. Temporary, aria-hidden masks reflect real wraps. */
export async function revealHeroHeadline(heading: HTMLElement) {
  const config: typeof heroHeadlineConfig = JSON.parse(
    heading.dataset.headlineConfig!,
  );
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const showSource = () => heading.removeAttribute("data-reveal-pending");
  if (document.hidden || !Element.prototype.animate) {
    showSource();
    return;
  }
  if (reduced.matches) {
    showSource();
    if (config.reducedMotion === "fade")
      heading.animate([{ opacity: 0.88 }, { opacity: 1 }], {
        duration: 160,
        easing: "ease-out",
      });
    return;
  }
  await document.fonts.ready;
  // Don't remove already-readable text for a belated entrance on a slow device.
  if (
    reduced.matches ||
    document.hidden ||
    !heading.hasAttribute("data-reveal-pending")
  ) {
    showSource();
    return;
  }
  const source = heading.querySelector<HTMLElement>("[data-headline-source]")!;
  const bounds = heading.getBoundingClientRect(),
    style = getComputedStyle(heading);
  const lineHeight = parseFloat(style.lineHeight),
    bleed = 3;
  const lines: Array<{ top: number; left: number; words: string[] }> = [];
  const walker = document.createTreeWalker(source, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent || "";
    for (const match of text.matchAll(/\S+/g)) {
      range.setStart(node, match.index!);
      range.setEnd(node, match.index! + match[0].length);
      const rect = range.getBoundingClientRect();
      let line = lines.find((l) => Math.abs(l.top - rect.top) < 2);
      if (!line) {
        line = { top: rect.top, left: rect.left, words: [] };
        lines.push(line);
      }
      line.words.push(match[0]);
    }
  }
  if (!lines.length || !Number.isFinite(lineHeight)) {
    showSource();
    return;
  }
  const layer = document.createElement("span");
  layer.setAttribute("aria-hidden", "true");
  layer.dataset.headlineLayer = "";
  Object.assign(layer.style, {
    position: "absolute",
    inset: "0",
    pointerEvents: "none",
    userSelect: "none",
  });
  const animations: Animation[] = [];
  let finished = false;
  const restore = () => {
    if (finished) return;
    finished = true;
    animations.forEach((a) => a.cancel());
    layer.remove();
    heading.removeAttribute("data-revealing");
    showSource();
    heading.dataset.revealState = "settled";
    resize.disconnect();
    reduced.removeEventListener("change", motionChange);
    window.removeEventListener("pagehide", restore);
  };
  const motionChange = () => {
    if (reduced.matches) restore();
  };
  const resize = new ResizeObserver(() => {
    const rect = heading.getBoundingClientRect();
    if (
      Math.abs(rect.width - bounds.width) > 1 ||
      Math.abs(rect.height - bounds.height) > 1
    )
      restore();
  });
  lines.forEach((line, index) => {
    const mask = document.createElement("span"),
      content = document.createElement("span");
    mask.dataset.revealLine = "";
    content.textContent = line.words.join(" ");
    Object.assign(mask.style, {
      position: "absolute",
      left: `${line.left - bounds.left}px`,
      top: `${index * lineHeight - bleed}px`,
      height: `${lineHeight + bleed * 2}px`,
      overflow: "hidden",
      whiteSpace: "nowrap",
    });
    Object.assign(content.style, {
      display: "block",
      paddingTop: `${bleed}px`,
      lineHeight: `${lineHeight}px`,
      willChange: "transform,filter",
    });
    mask.append(content);
    layer.append(mask);
  });
  heading.append(layer);
  heading.setAttribute("data-revealing", "");
  showSource();
  heading.dataset.revealState = "running";
  try {
    Array.from(layer.children).forEach((mask, index) => {
      const timing = {
        duration: config.durationMs,
        delay: config.delayMs + index * config.lineStaggerMs,
        easing: config.easing,
        fill: "both" as FillMode,
      };
      animations.push(
        mask.animate(
          [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)" }],
          timing,
        ),
      );
      animations.push(
        mask.firstElementChild!.animate(
          [
            {
              transform: `translateY(${config.travelPx}px)`,
              filter: `blur(${config.blurPx}px)`,
              opacity: config.startOpacity,
            },
            { transform: "translateY(0)", filter: "blur(0px)", opacity: 1 },
          ],
          timing,
        ),
      );
    });
  } catch {
    restore();
    return;
  }
  resize.observe(heading);
  reduced.addEventListener("change", motionChange);
  window.addEventListener("pagehide", restore, { once: true });
  Promise.allSettled(animations.map((a) => a.finished)).then(restore);
}
