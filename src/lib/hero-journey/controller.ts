import type { heroJourneyConfig } from "./config";
export function mountHeroJourney(root: HTMLElement) {
  const config: typeof heroJourneyConfig = JSON.parse(
    root.dataset.journeyConfig!,
  );
  const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-stage]"));
  const controls = cards.map((c) =>
    c.querySelector<HTMLButtonElement>("[data-stage-control]")!,
  );
  const toggle = root.querySelector<HTMLButtonElement>(
    "[data-sequence-toggle]",
  )!;
  const hero = root.closest<HTMLElement>(".hero")!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover:hover) and (pointer:fine)");
  let active = reduced.matches ? 2 : 0,
    hover = -1,
    focused = -1,
    paused = false,
    heroPaused = false,
    visible = true,
    dead = false,
    timer = 0;
  const clear = () => {
    clearTimeout(timer);
    timer = 0;
    root.removeAttribute("data-running");
  };
  const geometry = () => {
    root.style.setProperty("--active-step", String(active));
    root.style.setProperty("--flow-top", `${cards[active].offsetTop}px`);
    root.style.setProperty("--flow-height", `${cards[active].offsetHeight}px`);
  };
  const select = (index: number) => {
    active = index;
    cards.forEach((card, i) => {
      card.toggleAttribute("data-active", i === active);
      controls[i].setAttribute("aria-pressed", String(i === active));
    });
    root.dataset.activeStage = String(active);
    geometry();
  };
  const permitted = () =>
    !dead &&
    !paused &&
    !heroPaused &&
    !document.hidden &&
    visible &&
    !reduced.matches &&
    hover < 0 &&
    focused < 0;
  const schedule = (delay = config.autoplayMs + config.handoffDelayMs) => {
    clear();
    if (!permitted()) return;
    root.setAttribute("data-running", "");
    timer = window.setTimeout(() => {
      timer = 0;
      select((active + 1) % cards.length);
      schedule();
    }, delay);
  };
  const update = () => {
    toggle.hidden = reduced.matches;
    toggle.disabled = heroPaused;
    toggle.setAttribute("aria-pressed", String(paused || heroPaused));
    toggle.textContent =
      paused || heroPaused ? toggle.dataset.play! : toggle.dataset.pause!;
    schedule();
  };
  const interact = (index: number) => {
    clear();
    if (!reduced.matches || config.reducedMotionBehavior === "manual")
      select(index);
  };
  const resume = () => {
    if (focused >= 0) interact(focused);
    else if (hover >= 0) interact(hover);
    else schedule(config.resumeDelayMs);
  };
  cards.forEach((card, index) => {
    card.classList.remove("signal-stage");
    controls[index].hidden = false;
    card.addEventListener("pointerenter", () => {
      if (!fine.matches) return;
      hover = index;
      if (focused < 0) interact(index);
    });
    card.addEventListener("pointerleave", () => {
      if (hover === index) hover = -1;
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
      card.style.removeProperty("--spot-x");
      card.style.removeProperty("--spot-y");
      resume();
    });
    card.addEventListener(
      "pointermove",
      (e) => {
        if (!fine.matches || reduced.matches) return;
        const rect = card.getBoundingClientRect(),
          x = (e.clientX - rect.left) / rect.width,
          y = (e.clientY - rect.top) / rect.height;
        card.style.setProperty("--spot-x", `${x * 100}%`);
        card.style.setProperty("--spot-y", `${y * 100}%`);
        card.style.setProperty(
          "--tilt-x",
          `${(0.5 - y) * config.tiltDegrees}deg`,
        );
        card.style.setProperty(
          "--tilt-y",
          `${(x - 0.5) * config.tiltDegrees}deg`,
        );
      },
      { passive: true },
    );
    controls[index].addEventListener("focus", () => {
      focused = index;
      interact(index);
    });
    controls[index].addEventListener("blur", () => {
      if (focused === index) focused = -1;
      resume();
    });
    controls[index].addEventListener("click", (event) => {
      interact(index);
      if (!fine.matches && event.detail > 0) {
        focused = -1;
        hover = -1;
        controls[index].blur();
        schedule(config.resumeDelayMs);
      }
    });
  });
  toggle.addEventListener("click", () => {
    paused = !paused;
    update();
  });
  hero.addEventListener("hero-motion-change", ((
    e: CustomEvent<{ paused: boolean }>,
  ) => {
    heroPaused = e.detail.paused;
    update();
  }) as EventListener);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  });
  observer.observe(root);
  const resize = new ResizeObserver(geometry);
  resize.observe(root);
  const visibility = () => schedule();
  document.addEventListener("visibilitychange", visibility);
  reduced.addEventListener("change", () => {
    if (reduced.matches) {
      cards.forEach((card) => {
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      });
    }
    update();
  });
  window.addEventListener("pagehide", (e) => {
    clear();
    if (!e.persisted) {
      dead = true;
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    }
  });
  window.addEventListener("pageshow", update);
  root.setAttribute("data-enhanced", "");
  select(active);
  update();
}
