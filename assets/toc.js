// Auto-builds the "On this page" table of contents for the legal/terms page
// from the numbered section headings. Progressive enhancement: if this never
// runs, the page is still fully readable (the TOC container stays hidden).
document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".text-page.legal");
  const mount = document.querySelector("[data-toc]");
  if (!page || !mount) return;

  // numbered main sections (e.g. "1. Purpose", "12A. Reporting …") plus the
  // final "Account Deletion" section, which has no number.
  const heads = [...page.querySelectorAll("h3")].filter((h) => {
    const t = h.textContent.trim();
    return /^\d/.test(t) || t === "Account Deletion";
  });
  if (heads.length < 3) return;

  const slug = (s) =>
    s.toLowerCase().trim().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");

  const title = document.createElement("p");
  title.className = "toc-title";
  title.textContent = "On this page";

  const note = document.createElement("p");
  note.className = "toc-note";
  note.textContent =
    "We actually want you to read this — so we tried to make it easy. Nothing buried, nothing cheeky.";

  const list = document.createElement("ol");
  list.className = "toc-list";

  heads.forEach((h) => {
    if (!h.id) h.id = slug(h.textContent);
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent.trim();
    li.appendChild(a);
    list.appendChild(li);
  });

  mount.appendChild(title);
  mount.appendChild(note);
  mount.appendChild(list);
  mount.hidden = false;
});

// Back-to-top button — this page is long. Floats bottom-right and only appears
// after you've scrolled down, so it can't be tapped by accident near the top.
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.textContent = "↑";
  document.body.appendChild(btn);

  const toggle = () => btn.classList.toggle("show", window.scrollY > 700);
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
});
