document.addEventListener("DOMContentLoaded", () => {
  /* ---------- staggered reveal for the "three steps" ---------- */
  const steps = document.querySelector(".steps");
  if (steps && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            [...steps.children].forEach((c) => c.classList.add("in"));
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(steps);
  } else if (steps) {
    [...steps.children].forEach((c) => c.classList.add("in"));
  }

  /* ---------- auto-advancing "A look inside" carousel ---------- */
  const list = document.querySelector(".ss-list");
  if (list) {
    const gap = 18; // matches .ss-list gap
    let paused = false;
    let resumeTimer = null;

    const advance = () => {
      const img = list.querySelector("img");
      if (!img) return;
      const dist = img.offsetWidth + gap;
      const maxScroll = list.scrollWidth - list.clientWidth;
      if (list.scrollLeft >= maxScroll - 4) {
        list.scrollTo({ left: 0, behavior: "smooth" }); // loop back
      } else {
        list.scrollBy({ left: dist, behavior: "smooth" });
      }
    };

    setInterval(() => {
      if (!paused && !document.hidden) advance();
    }, 3000);

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
    };
    const resumeSoon = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, 2000);
    };

    // pause on user interaction, resume shortly after
    list.addEventListener("mouseenter", pause);
    list.addEventListener("mouseleave", resumeSoon);
    list.addEventListener("touchstart", pause, { passive: true });
    list.addEventListener("touchend", resumeSoon);
    list.addEventListener("pointerdown", pause);
    document.querySelectorAll(".ss-prev, .ss-next").forEach((b) =>
      b.addEventListener("click", () => {
        pause();
        resumeSoon();
      })
    );
  }
});
